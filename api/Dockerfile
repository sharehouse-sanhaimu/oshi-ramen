# syntax=docker/dockerfile:1
FROM ruby:3.4.1-slim

# 必要なディレクトリを作成
RUN mkdir -p /usr/local/bundle/bin
RUN chmod 777 /usr/local/bundle/bin


# 必要なパッケージのインストール
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
      build-essential \
      libpq-dev \
      nodejs \
      sqlite3 \
      libvips \
      curl && \
    rm -rf /var/lib/apt/lists/*

# Rails ユーザーとグループを作成
RUN groupadd -r rails && useradd -r -g rails rails

# 作業ディレクトリを作成
WORKDIR /api

# BUNDLE_PATHとPATHを設定
ENV BUNDLE_PATH=/usr/local/bundle
ENV PATH="/usr/local/bundle/bin:$PATH"

# Gemfile と Gemfile.lock をコピー
COPY Gemfile Gemfile.lock ./

# 作成した rails ユーザーが /usr/local/bundle に書き込めるように所有権を変更し、bundle install を実行
RUN chown -R rails:rails /usr/local/bundle && \
    bundle install --path "$BUNDLE_PATH"

# アプリケーションの全ソースをコピー
COPY . .

# 開発用サーバーのポートを公開
EXPOSE 3000

# コンテナ起動時はRailsサーバーを起動
CMD ["bin/rails", "server", "-b", "0.0.0.0", "-p", "3000"]
