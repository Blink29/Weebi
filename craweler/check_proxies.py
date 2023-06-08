import threading
import requests

def get_proxy_list():
    proxy_list = []
    with open("/Users/paurushkumar/Desktop/Project Weebi/craweler/free_proxy.txt", "r") as f:
        proxies = f.read().split("\n")
        for proxy in proxies:
            proxy_list.append(proxy)
    return proxy_list

def register_proxy(proxy):
    file = open("/Users/paurushkumar/Desktop/Project Weebi/craweler/valid_proxies.txt", "a")
    file.write(f"{proxy} \n")
    file.close()

def check_proxies(proxy):
    try:
        requests.get("https://gogoanime.cl/anime-list.html", proxies={
            "http": proxy,
            "https": proxy
        })
        print(f"[+] {proxy} is valid")
        register_proxy(proxy)
        return True
    except:
        print(f"[-] {proxy} is not valid")
        return False

proxy_list = get_proxy_list()
for proxy in proxy_list:
    thread = threading.Thread(target=check_proxies, args=(proxy,))
    thread.start()