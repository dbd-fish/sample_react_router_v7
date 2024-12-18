# Dockerfile for Frontend (React)
# ファイル名: frontend/Dockerfile

# ベースイメージとしてNode.jsを使用
FROM node:22

# 作業ディレクトリを設定
WORKDIR /app

# package.jsonとpackage-lock.jsonを先にコピーして依存関係をインストール
# COPY ./sample_remix_react/package.json ./package.json
# COPY ./sample_remix_react/package-lock.json ./package-lock.json

# RUN npm install

# プロジェクトのソースコード全体をコピー
COPY . .

# 開発サーバーを起動
# CMD ["npm", "run", "dev"]



# デフォルトのCMDをbashにしておく（デバッグや後の変更用）
CMD ["bash"]

