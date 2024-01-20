from bs4 import BeautifulSoup
import requests
import random
from utils import exception_handler
from tqdm import tqdm
import json
from database import Database


BASE_URL = "https://ww2.gogoanimes.fi"


class GogoAnimeScraper:
    def __init__(self):
        self.PROGRESS_FILE_NAME = "progress2.txt"
        self.anime_links = []
        self.complete_index = -1
        self.database = Database()

        print("[*] Loading cached progress...")
        if not self._load_progress():
            print("[-] No cache found")
            self._load_anime_links()
            self._save_progress()
        else:
            print("[+] Cache loaded")

    def loading_loop(self):
        while True:
            if self.complete_index == len(self.anime_links) - 1:
                print("[+] Scraping complete")
                break
            self._load_next_anime()

    def _load_next_anime(self):
        print("[*] Loading next anime...")
        self.complete_index += 1
        anime_link = self.anime_links[self.complete_index]
        anime_info = self._get_anime_info(anime_link)
        self.database.insert(anime_info)
        self._save_progress()
        anime_name = anime_info["title"]
        print(f"[+] {anime_name} added to database | INDEX = {self.complete_index}")
        return True

    def _load_progress(self):
        try:
            with open(self.PROGRESS_FILE_NAME, "r") as json_file:
                progress = json.load(json_file)
                self.anime_links = progress["anime_links"]
                self.complete_index = progress["complete_index"]
                return True
        except FileNotFoundError:
            return False

    def _save_progress(self):
        progress = {
            "anime_links": self.anime_links,
            "complete_index": self.complete_index,
        }
        with open(self.PROGRESS_FILE_NAME, "w") as json_file:
            json.dump(progress, json_file)

    def _load_anime_links(self):
        page_count = 1
        while True:
            print(f"[*] Loading Anime Links | Page : {page_count}")
            buffered_anime_links = self._get_page_anime_links(page_count)
            if not buffered_anime_links:
                break
            self.anime_links += buffered_anime_links
            page_count += 1
        return True

    @exception_handler
    def _get_page_anime_links(self, page_no):
        request = requests.get(f"{BASE_URL}/anime-list.html?page={page_no}")
        source_list = request.text
        soup_anime_list = BeautifulSoup(source_list, "lxml")
        anime_list = soup_anime_list.find("div", class_="anime_list_body")
        if anime_list is None:
            raise TypeError("anime_list is none type")
        links = []
        for anime_links in anime_list.find_all("a"):
            anime_link = anime_links["href"]
            link = f"{BASE_URL}{anime_link}"
            links.append(link)

        return links

    @exception_handler
    def _get_anime_info(self, anime_link):
        print("[*] Sending HTTP request to gogoanime...")
        source = requests.get(anime_link).text
        soup = BeautifulSoup(source, "lxml")

        # Plot Summary
        print("[*] Extracting plot summary...")
        anime_summary = soup.find("span", string="Plot Summary: ")
        if anime_summary:
            anime_summary = anime_summary.parent.text.strip()
            anime_summary = anime_summary.replace("Plot Summary: ", "")
        else:
            anime_summary = None

        # Type
        print("[*] Extracting anime type...")
        anime_type = soup.find("span", string="Type: ")
        if anime_type:
            anime_type = anime_type.parent.text.strip()
            anime_type = anime_type.replace("Type: ", "")
            anime_type = anime_type.replace("\n", "")
        else:
            anime_type = None

        # Genre
        print("[*] Extracting anime genre...")
        anime_genre = soup.find("span", string="Genre: ")
        if anime_genre:
            anime_genre = anime_genre.parent.text.strip()
            anime_genre = anime_genre.replace("Genre: ", "")
            anime_genre = anime_genre.split(",")
            anime_genre = [genre.strip() for genre in anime_genre]
        else:
            anime_genre = None

        # Release
        print("[*] Extracting anime release date...")
        anime_release = soup.find("span", string="Released: ")
        if anime_release:
            anime_release = anime_release.parent.text.strip()
            anime_release = anime_release.replace("Released: ", "")
        else:
            anime_release = None

        # Status
        print("[*] Extracting anime status...")
        anime_status = soup.find("span", string="Status: ")
        if anime_status:
            anime_status = anime_status.parent.text.strip()
            anime_status = anime_status.replace("Status: ", "")
            anime_status = anime_status.replace("\n", "")
        else:
            anime_status = None

        # Other Names
        print("[*] Extracting anime other names...")
        anime_other_name = soup.find("span", string="Other name: ")
        if anime_other_name:
            anime_other_name = anime_other_name.parent.text.strip()
            anime_other_name = anime_other_name.replace("Other name: ", "")
            anime_other_name = anime_other_name.split("/")
            anime_other_name = [name.strip() for name in anime_other_name]

        else:
            anime_other_name = None

        # Anime Image
        print("[*] Extracting anime image...")
        anime_img = soup.find("div", class_="anime_info_body_bg")
        if anime_img:
            anime_img = BASE_URL + anime_img.find("img")["src"]
        else:
            anime_img = None

        # Title
        print("[*] Extracting anime title...")
        anime_title = soup.find("div", class_="anime_info_body_bg")
        if anime_title:
            anime_title = anime_title.find("h1").text.strip()
        else:
            anime_title = None

        # Episodes
        print("[*] Extracting anime episodes...")
        anime_id = soup.find('input' ,class_="movie_id")['value']
        ep_num = soup.find('a', class_='active')['ep_end']
        endpoint = f"https://ajax.gogo-load.com/ajax/load-list-episode?ep_start=0&ep_end={ep_num}&id={anime_id}"
        source_code = requests.get(endpoint)
        ajax_soup = BeautifulSoup(source_code.text, 'lxml')
        episodes = [ BASE_URL + element["href"].strip() for element in ajax_soup.find_all('a') ]

        episode_player_links = []
        for episode_link in tqdm(episodes):
            episode_num = episode_link.split("/")[-1]
            iframe_link = self._extract_iframe_from_episode(episode_link)
            episode = {"episode_num": episode_num, "iframe_link": iframe_link}
            episode_player_links.append(episode)

        anime_info = {
            "title": anime_title,
            "image": anime_img,
            "summary": anime_summary,
            "type": anime_type,
            "genre": anime_genre,
            "release": anime_release,
            "status": anime_status,
            "other_names": anime_other_name,
            "episode_player_links": episode_player_links,
        }

        return anime_info

    @exception_handler
    def _extract_iframe_from_episode(self, episode_link):
        source = requests.get(episode_link)
        soup = BeautifulSoup(source.text, "lxml")
        iframe = soup.find("iframe")
        vid_src = iframe["src"]
        return vid_src
