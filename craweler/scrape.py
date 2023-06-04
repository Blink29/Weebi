from bs4 import BeautifulSoup
import requests

def get_anime_links(page_no):
    source_list = requests.get(f"https://gogoanime.cl/anime-list.html?page={page_no}").text
    soup_anime_list = BeautifulSoup(source_list, 'lxml')
    anime_list = soup_anime_list.find('div', class_="anime_list_body")

    links = []
    for anime_links in anime_list.find_all('a'):
        anime_link = anime_links['href']
        link = f"https://gogoanime.cl{anime_link}"
        links.append(link)

    return links

def get_anime_id_from_anime_link(anime_link):
    source = requests.get(anime_link).text
    soup = BeautifulSoup(source, 'lxml')
    anime_id = soup.find('input' ,class_="movie_id")['value']
    return anime_id

def get_episode_num(anime_link):
    source_anime_name = requests.get(anime_link).text
    soup_anime_name = BeautifulSoup(source_anime_name, 'lxml')
    ep_num = soup_anime_name.find('a', class_='active')['ep_end']
    return ep_num

def get_episode_links(anime_link):
    anime_id = get_anime_id_from_anime_link(anime_link)
    ep_num = get_episode_num(anime_link)
    endpoint = f"https://ajax.gogo-load.com/ajax/load-list-episode?ep_start=0&ep_end={ep_num}&id={anime_id}"
    source_code = requests.get(endpoint)
    soup = BeautifulSoup(source_code.text, 'lxml')
    episodes = [ "https://gogoanime.cl" + element["href"].strip() for element in soup.find_all('a') ]
    return episodes

def get_anime_name(anime_link):
    hiphen_name = anime_link.split("/")[-1]
    anime_name = hiphen_name.replace("-", " ").title()
    return anime_name

def extract_iframe_from_episode(episode_link):
    source = requests.get(episode_link)
    soup = BeautifulSoup(source.text, 'lxml')
    iframe = soup.find('iframe')
    vid_src = iframe["src"]
    return vid_src

