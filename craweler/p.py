from bs4 import BeautifulSoup
import requests

source = requests.get("https://gogoanime.cl/category/otonari-ni-ginga").text

soup = BeautifulSoup(source, 'lxml')

link_id = soup.find('input' ,class_="movie_id")['value']
print(link_id)