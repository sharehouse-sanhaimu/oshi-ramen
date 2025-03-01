from fastapi import APIRouter
from modules.print_magazine import print_magazine

router = APIRouter()


@router.post("/print_magazine")
def post_magazine(magazine_path: str):
    print_magazine(
        magazine_path,  # "./out/output_page_1.jpg"
    )
    return {"message": "Success"}
