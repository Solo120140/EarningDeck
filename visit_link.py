import requests
from stem import Signal
from stem.control import Controller
import time

# Function to change Tor identity
def renew_tor_ip():
    with Controller.from_port(port=9051) as controller:
        controller.authenticate(password='16:0BD5DA43D588053D6000DF7AEADE810DEE3C330E5B09009AEC8497F845')
        controller.signal(Signal.NEWNYM)

# Function to visit your direct link
def visit_link(url):
    proxies = {
        'http': 'socks5h://127.0.0.1:9050',
        'https': 'socks5h://127.0.0.1:9050'
    }
    try:
        response = requests.get(url, proxies=proxies, timeout=30)
        return response
    except requests.RequestException as e:
        print(f"Request failed: {e}")
        return None

# Main script
if __name__ == "__main__":
    url = "https://www.highrevenuenetwork.com/v5hrz138t?key=ca4f3aa99983b71ec79abcba7b58f386"
    while True:
        try:
            renew_tor_ip()
            time.sleep(5)  # Wait for Tor to establish a new identity
            response = visit_link(url)
            if response:
                print(f"Visited {url} with status code: {response.status_code}")
            else:
                print(f"Failed to visit {url}")
            time.sleep(30)  # Wait before the next visit
        except Exception as e:
            print(f"An error occurred: {e}")
            time.sleep(60)  # Wait before retrying if an error occurs
