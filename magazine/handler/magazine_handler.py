import sys
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parent.parent))

from models.radar_chart import RadarChartInput
from models.ramen_info import RamenInfo
from modules.fetch_ramen_info import fetch_ramen_info


def magazine_handler(user_id: int):
    data = fetch_ramen_info(user_id)
    print(len(data))

    img_urls = [d["image_url"] for d in data]
    print(img_urls, len(img_urls))

    ramen_info_list = [RamenInfo(store=d["store_name"], name=d["name"]) for d in data]
    print(ramen_info_list)

    radar_chart_list = [
        RadarChartInput(
            deliciousness_id=d["parameters"]["deliciousness_id"],
            portion_id=d["parameters"]["portion_id"],
            noodletexture_id=d["parameters"]["noodle_texture_id"],
            noodle_thickness_id=d["parameters"]["noodle_thickness_id"],
            soup_richness_id=d["parameters"]["soup_richness_id"],
        )
        for d in data
    ]
    print(radar_chart_list)


if __name__ == "__main__":
    magazine_handler(2)
