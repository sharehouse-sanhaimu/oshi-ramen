import os
import random

import requests


def fetch_ramen_info(id: str) -> list:
    api_endpoint = os.getenv("API_ENDPOINT")
    url = f"{api_endpoint}/v1/ramen?user_id={id}"
    print("url:", url)

    response = requests.get(url, headers={"Content-Type": "application/json"})
    print(response.status_code)
    print(response.json(), len(response.json()))

    extracted_data = []
    id_set = set()
    while len(extracted_data) < 3 or len(response.json()) == len(id_set):
        _id = random.randint(0, len(response.json()) - 1)
        if _id in id_set:
            continue
        id_set.add(_id)
        extracted_data.append(response.json()[_id])
    print(len(extracted_data))

    return extracted_data


if __name__ == "__main__":
    fetch_ramen_info("2")
