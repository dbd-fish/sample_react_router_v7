# リポジトリ概要
Docker環境でReact(Remix)を使用してログイン画面、マイページ画面、ホーム画面を作成しました。
Cypress用のコンテナを作成してCypressによる自動テストを少し試してみました。

cert.pemとkey.pemを準備すればHTTPSでLocalhostを起動できる
CypressによるE2Eテストが可能
HttpOnlyCookieに認証情報を格納して送信する。
mswでAPIをモックする

# 主な技術スタック
- 環境構築: 
    - Docker
    - docker-compose
- フロントエンド:
    - React (^18.2.0)
    - Remix (^2.15.1)
    - TypeScript (^5.1.6)
    - TailwindCSS (^3.4.17)
- ビルドツール:
    - Vite (^5.1.0)
    - vite-tsconfig-paths (^4.2.1)
- 静的解析:
    - ESLint (^8.57.1)
    - Prettier (^2.8.8)
- APIモック:
    - MSW (Mock Service Worker ^2.7.0)
- テスト: 
    - cypress/included:13.17.0




# ディレクトリ構成
下記のようなディレクトリ構成としました。



# 環境構築手順
localhostをHTTPSで起動するためにcert.pemとkey.pemを生成する。
Windows端末でcert.pemとkey.pemを生成する方法は下記に記載。
https://github.com/dbd-fish/react_sample/issues/12#issuecomment-2570993736

cert.pemとkey.pemを下記に格納。
`sample_frontend_container\sample_remix_react\certs\cert.pem`
`sample_frontend_container\sample_remix_react\certs\key.pem`

Docker環境を構築して下記コマンドを実行。
```Bash
docker-compose up --build
```

frontendコンテナを起動して下記コマンドを実行
```Bash
cd sample_remix_react
npm run dev
```

下記URLから動作確認が可能。  
https://localhost:5173/home


Cypressによるテストをする場合は`https://localhost:5173/home`が有効な状態でCypressコンテナを起動する。

# 各種コマンド
コンテナ内で下記コマンドを実行可能。

## tsc
frontコンテナ内において下記コマンドでtscを実行可能。
```Bash
npm run typecheck
```

## prettier
frontコンテナ内において下記コマンドでprettierの自動修正。
```Bash
npm run format
```

## eslint
frontコンテナ内において下記コマンドでeslintの自動修正。
```Bash
npm run lint
```



