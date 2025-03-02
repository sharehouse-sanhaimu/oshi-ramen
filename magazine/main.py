import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import make_magazine, print_magazine, test

app = FastAPI()

EXECUTING_ENVIRONMENT = os.getenv("EXECUTING_ENVIRONMENT")
print(f"EXECUTING_ENVIRONMENT: {EXECUTING_ENVIRONMENT}")

origins = [
    os.getenv("ACSESS_ALLOW_URL"),  # Next.jsアプリケーションのオリジン
    "http://localhost:3000",  # Next.jsのオリジンを許可
    # 必要に応じて他のオリジンも追加
    "https://oshi-ramen-api.shaoba.tech",
    "https://oshi-ramen.shaoba.tech",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # 許可するオリジン
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


if EXECUTING_ENVIRONMENT == "prod":
    pass

elif EXECUTING_ENVIRONMENT == "dev":
    app.include_router(test.router)
    app.include_router(make_magazine.router)
    app.include_router(print_magazine.router)

else:
    pass
