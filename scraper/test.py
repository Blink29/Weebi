# from scrape import get_anime_links


# result = get_anime_links(1)
# print(result)

from scrape import GogoAnimeScraper
from pprint import pprint
from database import insert_document
import requests
from bs4 import BeautifulSoup
from pprint import pprint

# import requests

anime_link = "https://ww4.gogoanime2.org/anime/oshi-no-ko-dub"

scraper = GogoAnimeScraper()

episode_link = "https://ww4.gogoanime2.org/watch/oshi-no-ko-dub/1"

# request = requests.get(anime_link)
# print(request.text)


# result = scraper._get_anime_info(anime_link)
# insert_document(result)
# result = get_episode_links(anime_link)

# episodes = get_anime_info(anime_link)

# iframe = extract_iframe_from_episode(episode_link)

# pprint(iframe)

# print(soup.prettify())


result = scraper._get_page_anime_links(97)

pprint(result)
