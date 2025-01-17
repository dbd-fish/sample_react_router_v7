# Dockerfile for Frontend (React)
# ファイル名: frontend/Dockerfile

# ベースイメージとしてNode.jsを使用
FROM node:22

# 作業ディレクトリを設定
WORKDIR /app


# プロジェクトのソースコード全体をコピー
COPY . .

# 作業ディレクトリを作成済みのRemixプロジェクトに変更して、依存関係をインストール
WORKDIR /app/sample_react-router
RUN npm install

# デフォルトのCMDをbashにしておく（デバッグや後の変更用）
# CMD ["bash"]

