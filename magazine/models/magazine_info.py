from dataclasses import dataclass
from pathlib import Path
from magazine.models.ramen_info import RamenInfo

@dataclass
class MagazineInfo:
    out_path: str
    images: list[str]
    bgimg_path: str
    radar_charts: list[str]
    ramen_info: list[RamenInfo]
