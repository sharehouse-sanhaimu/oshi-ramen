import sys
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parent.parent))

from models.radar_chart import RadarChartInput
from models.ramen_info import RamenInfo
from modules.create_radar_chart import create_radar_chart
from modules.fetch_ramen_info import fetch_ramen_info
from modules.make_magazine import make_magazine


def magazine_handler(user_id: int):
    BASE_OUT_DIR = Path("out") / str(user_id)

    data = fetch_ramen_info(user_id)
    print(len(data))

    img_urls: list[str] = [d["image_url"] for d in data]
    print(img_urls, len(img_urls))

    ramen_info_list: list[RamenInfo] = [
        RamenInfo(store=d["store_name"], name=d["name"]) for d in data
    ]
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

    # Create output directory if it doesn't exist
    output_dir = BASE_OUT_DIR / "radar_charts"
    output_dir.mkdir(parents=True, exist_ok=True)

    radar_chart_path: list[Path] = []
    # Create and save radar charts
    for i, radar_chart_input in enumerate(radar_chart_list):
        fig = create_radar_chart(radar_chart_input)
        output_path = output_dir / f"radar_chart_{i}.png"
        radar_chart_path.append(output_path)
        fig.savefig(output_path)
        print(f"Saved radar chart to {output_path}")

    print(radar_chart_path)

    # Create magazine
    out_path = BASE_OUT_DIR / "magazine.pdf"
    make_magazine(str(out_path), img_urls, radar_chart_path, ramen_info_list)
    print("Created magazine")


if __name__ == "__main__":
    magazine_handler(2)
