import time
import requests
from stem import Signal
from stem.control import Controller
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Function to change Tor identity
def renew_tor_ip():
    with Controller.from_port(port=9051) as controller:
        controller.authenticate()
        controller.signal(Signal.NEWNYM)

# Function to visit your direct link and interact with the page
def visit_link(url):
    proxies = {
        'http': 'socks5h://127.0.0.1:9050',
        'https': 'socks5h://127.0.0.1:9050'
    }
    
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument('--proxy-server=socks5://127.0.0.1:9050')
    
    driver = webdriver.Chrome(options=chrome_options)
    
    try:
        driver.get(url)
        print(f"Visited {url} with status code: {driver.execute_script('return document.readyState')}")
        
        # Wait for the page to load completely
        WebDriverWait(driver, 30).until(EC.presence_of_element_located((By.TAG_NAME, "body")))
        
        # Wait for a random element to interact with (e.g., clicking a button or a link)
        time.sleep(10)  # Wait for 10 seconds before interacting
        body = driver.find_element(By.TAG_NAME, "body")
        actions = ActionChains(driver)
        actions.move_to_element_with_offset(body, 10, 10).click().perform()
        
        print("Clicked on the page")

        # Wait for some time on the page
        time.sleep(30)  # Wait for 30 seconds on the page
        
    except Exception as e:
        print(f"An error occurred: {e}")
    
    finally:
        driver.quit()

# Main script
if __name__ == "__main__":
    url = "https://www.highrevenuenetwork.com/un433q9fx?key=640daae2372e37d8831e72699395dd56"
    while True:
        try:
            renew_tor_ip()
            time.sleep(5)  # Wait for Tor to establish a new identity
            visit_link(url)
            time.sleep(30)  # Wait before the next visit
        except Exception as e:
            print(f"An error occurred: {e}")
            time.sleep(60)  # Wait before retrying if an error occurs
