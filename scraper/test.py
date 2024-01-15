# from scrape import get_anime_links


# result = get_anime_links(1)
# print(result)

from scrape import get_anime_info
from pprint import pprint

# import requests

anime_link = "https://ww4.gogoanime2.org/anime/oshi-no-ko-dub"

# request = requests.get(anime_link)
# print(request.text)

result = get_anime_info(anime_link)

pprint(result)
