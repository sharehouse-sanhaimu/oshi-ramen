import os

import requests


def fetch_ramen_info(id: str):
    api_endpoint = os.getenv("API_ENDPOINT")
    url = f"{api_endpoint}/v1/ramen?user_id={id}"
    print("url:", url)

    response = requests.get(
        url,
        headers={
            "Content-Type": "application/json"
            }
        )
    print(response.status_code)


if __name__ == "__main__":
    fetch_ramen_info("2")
