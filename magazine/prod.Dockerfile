# ======================
# Stage 1: Builder
# ======================
FROM python:3.11-slim as builder

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

# ビルドに必要なパッケージをインストール
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    poppler-utils \
    python3-distutils \
 && rm -rf /var/lib/apt/lists/*

# 依存関係ファイルのコピー
COPY requirements.txt .

# 依存パッケージを /install にインストール（不要なファイルを含めず、ランタイム成果物だけを取得）
RUN pip install --upgrade pip && \
    pip install --no-cache-dir --prefix=/install -r requirements.txt

# アプリケーションコードのコピー
COPY . .

# ======================
# Stage 2: Runner using distroless (nonroot)
# ======================
FROM gcr.io/distroless/python3-debian12:nonroot as runner

WORKDIR /app

# PYTHONPATH をランタイム依存ディレクトリに設定
ENV PYTHONPATH=/app/venv

# builder から、ランタイムに必要な site‑packages 部分だけをコピー
COPY --from=builder /install/lib/python3.11/site-packages /app/venv
# アプリケーションコードをコピー
COPY --from=builder /app /app

EXPOSE 9004

# Python の ENTRYPOINT が python3 となっているため、モジュール実行形式に変更
CMD ["-m", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "9004"]
