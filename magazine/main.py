import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import make_magazine, print_magazine, test

app = FastAPI()

EXECUTING_ENVIRONMENT = os.getenv("EXECUTING_ENVIRONMENT")
print(f"EXECUTING_ENVIRONMENT: {EXECUTING_ENVIRONMENT}")

origins_dev = [
    "http://localhost:3000",  # Next.jsのオリジンを許可
    "http://localhost:8000",  # FastAPIのオリジンを許可
]

origins_prod = ["https://oshi-ramen.nosse.net", "https://oshi-ramen-api.nosse.net"]


if EXECUTING_ENVIRONMENT == "prod":
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins_prod,  # 許可するオリジン
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(test.router)
    app.include_router(make_magazine.router)
    app.include_router(print_magazine.router)


elif EXECUTING_ENVIRONMENT == "dev":
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins_dev,  # 許可するオリジン
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.include_router(test.router)
    app.include_router(make_magazine.router)
    app.include_router(print_magazine.router)

else:
    pass
