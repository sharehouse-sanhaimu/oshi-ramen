from fastapi import APIRouter

from models.magazine_info import MagazineInfo
from modules.make_magazine import make_magazine

router = APIRouter()


@router.post("/make_magazine")
def post_magazine(magazine_info: MagazineInfo):
    make_magazine(
        magazine_info.out_path,
        magazine_info.images,
        magazine_info.bgimg_path,
        magazine_info.radar_charts,
        magazine_info.ramen_info,
    )
    return {"message": "Success"}
