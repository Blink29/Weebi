import requests


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
