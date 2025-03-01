from dataclasses import dataclass

from models.ramen_info import RamenInfo


@dataclass
class MagazineInfo:
    out_path: str
    images: list[str]
    bgimg_path: str
    radar_charts: list[str]
    ramen_info: list[RamenInfo]
