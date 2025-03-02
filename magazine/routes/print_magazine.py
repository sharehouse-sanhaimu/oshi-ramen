from pathlib import Path

from fastapi import APIRouter
from modules.print_magazine import print_magazine

router = APIRouter()

BASE_DIR = Path("out")


@router.post("/print_magazine")
def post_magazine(user_id: int):
    magazine_path = BASE_DIR / str(user_id) / "magazine.pdf"
    print_magazine(
        magazine_path,  # "./out/output_page_1.jpg"
    )
    return {"message": "Success"}
