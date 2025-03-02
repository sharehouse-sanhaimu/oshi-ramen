from fastapi import APIRouter
from handler.magazine_handler import make_magazine

router = APIRouter()


@router.post("/make_magazine")
def generate_magazine(user_id: int):
    make_magazine(user_id)
    return {"message": "Success"}
