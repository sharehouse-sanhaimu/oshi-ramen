from fastapi import APIRouter
from handler.magazine_handler import magazine_handler

router = APIRouter()


@router.post("/make_magazine")
def generate_magazine(user_id: int):
    magazine_handler(user_id)
    return {"message": "Success"}
