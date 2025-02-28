# Use the official Node.js image as the base image
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
# COPY package.json ./

# # Install dependencies
# RUN npm install

# # Copy the rest of the application code
# COPY . .

# # Build the application
# RUN npm run build

# pnpmをインストール
RUN npm install -g pnpm

# pnpm のグローバルバイナリディレクトリを設定
RUN pnpm config set global-bin-dir /usr/local/bin

# buildを許可
RUN pnpm approve-builds

# Expose the port the app runs on
EXPOSE 3000

# パッケージファイルをコピーして依存関係をインストール
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

CMD ["pnpm","dev"]
