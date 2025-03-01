import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes import test
from routes import make_magazine
from routes import print_magazine

app = FastAPI()

EXECUTING_ENVIRONMENT = os.getenv("EXECUTING_ENVIRONMENT")
print(f"EXECUTING_ENVIRONMENT: {EXECUTING_ENVIRONMENT}")

origins = [
    os.getenv("ACSESS_ALLOW_URL"),  # Next.jsアプリケーションのオリジン
    # 必要に応じて他のオリジンも追加
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # 許可するオリジンのリスト
    allow_credentials=True,
    allow_methods=["*"],  # すべてのメソッドを許可
    allow_headers=["*"],  # すべてのヘッダーを許可
)


if EXECUTING_ENVIRONMENT == "prod":
    pass

elif EXECUTING_ENVIRONMENT == "dev":
    app.include_router(test.router)
    app.include_router(make_magazine.router)
    app.include_router(print_magazine.router)

else:
    pass
