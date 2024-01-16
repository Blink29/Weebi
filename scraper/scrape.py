from bs4 import BeautifulSoup
import requests
import random


BASE_URL = "https://ww4.gogoanime2.org"


def exception_handler(func):
    def wrapper(*args, **kwargs):
        while True:
            try:
                return func(*args, **kwargs)
            except requests.exceptions.ProxyError:
                print("[-] Proxy error, trying again...")
                continue
            except requests.exceptions.ConnectionError:
                print("[-] Connection error, trying again...")
                continue

    return wrapper


@exception_handler
def get_anime_links(page_no):
    request = requests.get(f"{BASE_URL}/animelist?page={page_no}")
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


# def get_total_anime_links():
#     total_links = []
#     PAGE_NO = 1
#     while (PAGE_NO < 4):
#         total_anime_links = get_anime_links(PAGE_NO)
#         PAGE_NO = PAGE_NO + 1
#         total_links.append(total_anime_links)

#     return total_links


# print(get_total_anime_links())


def get_anime_id_from_anime_link(anime_link):
    source = requests.get(anime_link).text
    soup = BeautifulSoup(source, "lxml")
    anime_id = soup.find("input", class_="movie_id")["value"]
    return anime_id


def get_episode_num(anime_link):
    source_anime_name = requests.get(anime_link).text
    soup_anime_name = BeautifulSoup(source_anime_name, "lxml")
    ep_num = soup_anime_name.find("a", class_="active")["ep_end"]
    return ep_num


@exception_handler
def get_episode_links(anime_link):
    anime_id = get_anime_id_from_anime_link(anime_link)
    ep_num = get_episode_num(anime_link)
    endpoint = f"https://ajax.gogo-load.com/ajax/load-list-episode?ep_start=0&ep_end={ep_num}&id={anime_id}"
    source_code = requests.get(endpoint)
    soup = BeautifulSoup(source_code.text, "lxml")
    episodes = [
        "https://ww1.gogoanimes.fi/" + element["href"].strip()
        for element in soup.find_all("a")
    ]
    return episodes


def get_anime_name(anime_link):
    hiphen_name = anime_link.split("/")[-1]
    anime_name = hiphen_name.replace("-", " ").title()
    return anime_name


def extract_iframe_from_episode(episode_link):
    source = requests.get(episode_link)
    soup = BeautifulSoup(source.text, "lxml")
    iframe = soup.find("iframe")
    vid_src = iframe["src"]
    return vid_src


@exception_handler
def get_anime_info(anime_link):
    source = requests.get(anime_link).text
    soup = BeautifulSoup(source, "lxml")

    anime_summary = soup.find("span", string="Plot Summary: ")
    if anime_summary:
        anime_summary = anime_summary.parent.text.strip()
        anime_summary = anime_summary.replace("Plot Summary: ", "")
    else:
        anime_summary = None

    anime_type = soup.find("span", string="Type: ")
    if anime_type:
        anime_type = anime_type.parent.text.strip()
        anime_type = anime_type.replace("Type: ", "")
        anime_type = anime_type.replace("\n", "")
    else:
        anime_type = None

    anime_genre = soup.find("span", string="Genre: ")
    if anime_genre:
        anime_genre = anime_genre.parent.text.strip()
        anime_genre = anime_genre.replace("Genre: ", "")
        anime_genre = anime_genre.split(",")
        anime_genre = [genre.strip() for genre in anime_genre]
    else:
        anime_genre = None

    anime_release = soup.find("span", string="Released: ")
    if anime_release:
        anime_release = anime_release.parent.text.strip()
        anime_release = anime_release.replace("Released: ", "")
    else:
        anime_release = None

    anime_status = soup.find("span", string="Status: ")
    if anime_status:
        anime_status = anime_status.parent.text.strip()
        anime_status = anime_status.replace("Status: ", "")
        anime_status = anime_status.replace("\n", "")
    else:
        anime_status = None

    anime_other_name = soup.find("span", string="Other name: ")
    if anime_other_name:
        anime_other_name = anime_other_name.parent.text.strip()
        anime_other_name = anime_other_name.replace("Other name: ", "")
        anime_other_name = anime_other_name.split("/")
        anime_other_name = [name.strip() for name in anime_other_name]

    else:
        anime_other_name = None

    anime_img = soup.find("div", class_="anime_info_body_bg")
    if anime_img:
        anime_img = BASE_URL + anime_img.find("img")["src"]
    else:
        anime_img = None

    anime_title = soup.find("div", class_="anime_info_body_bg")
    if anime_title:
        anime_title = anime_title.find("h1").text.strip()
    else:
        anime_title = None

    episode_page = soup.find("div", class_="anime_video_body")
    episodes = episode_page.find("ul", id="episode_related")
    episodes = episodes.find_all("li")
    episodes = [BASE_URL + episode.find("a")["href"] for episode in episodes]

    anime_info = {
        "title": anime_title,
        "image": anime_img,
        "summary": anime_summary,
        "type": anime_type,
        "genre": anime_genre,
        "release": anime_release,
        "status": anime_status,
        "other_names": anime_other_name,
        "episodes": episodes,
    }

    return anime_info
