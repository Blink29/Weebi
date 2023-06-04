from scrape import get_anime_links, get_episode_links, extract_iframe_from_episode, get_anime_name
from database import insert_document
from pprint import pprint
import threading

def scrape_anime_link(anime_link):
    episode_links = get_episode_links(anime_link)
    anime_name = get_anime_name(anime_link)
    iframe_links = []
    
    for episode_link in episode_links:
        iframe_link = extract_iframe_from_episode(episode_link)
        iframe_links.append(iframe_link)
    
    document = {
        "anime_name": anime_name,
        "iframe_links": iframe_links
    }

    insert_document(document)

PAGE = 1

anime_links = get_anime_links(1)

counter = 0

threads = []
for anime_link in anime_links:
    counter += 1
    if counter == 10:
        break
    thread = threading.Thread(target=scrape_anime_link, args=(anime_link,))
    thread.start()
    threads.append(thread)

print("hello world")

for thread in threads:
    thread.join()