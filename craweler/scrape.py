from bs4 import BeautifulSoup
import requests

# source = requests.get('https://gogoanime.cl/category/kimetsu-no-yaiba').text

source_list = requests.get("https://gogoanime.cl/anime-list.html").text

soup_anime_list = BeautifulSoup(source_list, 'lxml')

anime_list = soup_anime_list.find('div', class_="anime_list_body")
for anime_links in anime_list.find_all('a'):
    anime_link = anime_links['href']
    # print(anime_link)

    source_anime_name = requests.get(f"https://gogoanime.cl{anime_link}").text
    soup_anime_name = BeautifulSoup(source_anime_name, 'lxml')
    ep_num = soup_anime_name.find('a', class_='active')['ep_end']
    # print(ep_num)

    anime_name = anime_link.split("/")[2]
    # print(anime_name)

    for i in range(1, int(ep_num)):
        source_anime_link = requests.get(f"https://gogoanime.cl/{anime_name}-episode-{i}").text
        soup_anime_link = BeautifulSoup(source_anime_link, 'lxml')
        iframe = soup_anime_link.find('iframe')['src']
        vid_src = iframe
        print(soup_anime_link.find('title').text)
        print(vid_src)


# ep_num = soup.find('a', class_='active')['ep_end']
# print(ep_num)

# source = requests.get("https://www3.gogoanimes.fi/kimetsu-no-yaiba-episode-1").text

# soup = BeautifulSoup(source, 'lxml')

# iframe = soup.find('iframe')
# vid_src = iframe['src']
# print(vid_src)

