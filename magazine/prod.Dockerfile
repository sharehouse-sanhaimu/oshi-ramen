# ======================
# Stage 1: Builder
# ======================
FROM python:3.11-alpine as builder

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# ビルドに必要なパッケージをapkでインストール
RUN apk add --no-cache \
    build-base \
    poppler-utils \
    python3-dev

# 依存関係ファイルのコピー
COPY requirements.txt .

# 依存パッケージを /install にインストール
RUN pip install --upgrade pip && \
    pip install --no-cache-dir --prefix=/install -r requirements.txt

# アプリケーションコードのコピー
COPY . .

# ======================
# Stage 2: Runner
# ======================
FROM python:3.11-alpine

WORKDIR /app

# ランタイムに必要なパッケージのみインストール（poppler-utils は必要）
RUN apk add --no-cache poppler-utils

# ※ Alpine の公式イメージでは、Python の標準ライブラリに distutils が含まれている場合が多いです。
# もし実行時に distutils が見つからない場合、下記のようにビルダーから distutils をコピーすることを検討してください。
# COPY --from=builder /usr/local/lib/python3.11/distutils /usr/local/lib/python3.11/distutils

# builder から、インストール済みのPythonパッケージを/usr/localにコピー
COPY --from=builder /install /usr/local

# アプリケーションコードをコピー
COPY --from=builder /app /app

EXPOSE 9004

CMD ["python", "-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "9004"]
