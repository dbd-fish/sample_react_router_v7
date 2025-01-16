# リポジトリ概要
Docker環境でReact(Remix)を使用してログイン画面、マイページ画面、ホーム画面を作成しました。
Cypress用のコンテナを作成してCypressによる自動テストを少し試してみました。

## ポイント
- cert.pemとkey.pemを準備すればHTTPSでLocalhostを起動できる
- CypressによるE2Eテストが可能
- HttpOnlyCookieに認証情報を格納してAPIに送信する。
- mswでAPIをモックする

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
```txt

C:.
│  .gitignore                 # Gitで追跡しないファイルやディレクトリを定義
│  docker-compose.yml         # Docker Composeの設定ファイル。複数のコンテナを統合して管理
│  README.md                  # プロジェクト概要と使用方法の説明
│  
├─.github                     # GitHub関連の設定ファイルを格納
│  │  pull_request_template.md  # プルリクエスト作成時のテンプレート
│  │  
│  ├─ISSUE_TEMPLATE            # Issueテンプレートを格納
│  │      issue_template.md    # Issue作成時のテンプレート
│  │      
│  └─workflows                 # GitHub Actions用のワークフロー
│          github-actions_backend_pytest.yml     # バックエンドのPytest用CI/CD設定
│          github-actions_frontend_prettier_eslint.yml # フロントエンドのPrettier/ESLint用CI/CD設定
│          
├─cypress_container           # Cypress実行用コンテナ
│  │  cypress.config.js       # Cypressの設定ファイル
│  │  Dockerfile              # Cypressテスト用コンテナの設定ファイル
│  │  
│  ├─cypress                  # Cypress関連ファイル
│  │  ├─fixtures              # テスト用のサンプルデータを格納
│  │  │      loginData.json   # ログイン用のサンプルデータ
│  │  │      
│  │  ├─plugins               # Cypressのプラグイン設定
│  │  ├─screenshots           # テスト実行中にキャプチャされたスクリーンショット
│  │  └─support               # テスト支援コードやカスタムロジック
│  │          errorHandling.js # エラーハンドリングロジック
│  │          
│  ├─e2e                      # E2Eテストのスクリプトを格納
│  │          
│  └─front_st                 # フロントエンド単位でのテストスクリプトを格納
│      └─routes               # route単位でテストを格納する
│              login.cy.js    # ログイン画面のテスト
│              
├─sample_backend_container    # バックエンドコンテナ。今回は未作成。
│      
└─sample_frontend_container   # フロントエンドコンテナ
    │  .dockerignore          # Dockerで無視するファイルを定義
    │  .env                   # 環境変数を格納
    │  Dockerfile             # フロントエンド環境を構築するDocker設定ファイル
    │  
    ├─.vscode                 # VS Codeの設定ディレクトリ
    │      settings.json      # ワークスペース固有の設定
    │      
    └─sample_react-router      # フロントエンドアプリケーションの主要ディレクトリ (Remix使用)
        │  .eslintrc.cjs      # ESLintの設定ファイル
        │  .gitignore         # Gitで追跡しないファイルを定義
        │  .prettierrc        # Prettierの設定ファイル
        │  package-lock.json  # npm依存関係のロックファイル
        │  package.json       # プロジェクトの依存関係とスクリプト
        │  react-router.config.ts # React Routerの設定ファイル
        │  tailwind.config.ts # Tailwind CSSの設定ファイル
        │  tsconfig.json      # TypeScriptの設定
        │  vite.config.ts     # Viteの設定ファイル
        │  
        ├─.react-router       # React Router関連の一時ディレクトリや設定ファイルを格納
        ├─app                 # アプリケーションのメインコード
        │  │  entry.client.tsx  # クライアントサイドエントリポイント
        │  │  entry.server.tsx  # サーバーサイドエントリポイント
        │  │  error-boundary.tsx # エラーバウンドリコンポーネント
        │  │  root.tsx         # アプリケーションのルートコンポーネント
        │  │  routes.ts        # ルート設定ファイル
        │  │  tailwind.css     # Tailwind CSSのスタイル
        │  │  
        │  ├─actions           # Action関数 (フォーム送信など) のロジック
        │  │      logoutAction.tsx # ログアウト処理
        │  │      
        │  ├─components        # UIコンポーネント
        │  │  │  ErrorMessage.tsx # エラーメッセージ表示用のコンポーネント
        │  │  │  Footer.tsx     # フッター部分のUIコンポーネント
        │  │  │  Header.tsx     # ヘッダー部分のUIコンポーネント
        │  │  │  SiteTitle.tsx  # サイトタイトル表示用のコンポーネント
        │  │  │  
        │  │  ├─forms           # フォームコンポーネント
        │  │  │      LoginForm.tsx # ログイン用フォーム
        │  │  │      SearchForm.tsx # 検索フォーム
        │  │  │      
        │  │  ├─header          # ヘッダーのバリエーション
        │  │  │      LoggedInHeade.tsx   # ログイン時に表示されるヘッダー
        │  │  │      LoggedOutHeader.tsx # 未ログイン時に表示されるヘッダー
        │  │  │      
        │  │  ├─layout          # レイアウト関連コンポーネント
        │  │  │      Footer.tsx  # フッター部分のレイアウト
        │  │  │      Navbar.tsx  # ナビゲーションバー
        │  │  │      
        │  │  └─mypage          # マイページ関連のコンポーネント
        │  │          ProfileCard.tsx # プロフィール表示用カード
        │  │          
        │  ├─hooks              # カスタムフック
        │  │      useClickOutside.tsx # 要素外クリック検知用フック
        │  │      
        │  ├─loaders            # データロードのロジック
        │  │      authTokenLoader.tsx # 認証トークンをロードするロジック
        │  │      userDataLoader.tsx  # ユーザーデータをロードするロジック
        │  │      
        │  ├─mocks              # テスト用のモックデータやモックサーバー設定
        │  │  │  browser.ts     # ブラウザモックの設定
        │  │  │  server.ts      # サーバーモックの設定
        │  │  │  
        │  │  └─handlers        # モックハンドラー
        │  │          getMeHandler.ts # ユーザーデータ取得モック
        │  │          index.ts         # モックハンドラーのエントリポイント
        │  │          loginHandler.ts  # ログイン処理モック
        │  │          logoutHandler.ts # ログアウト処理モック
        │  │          
        │  ├─routes             # Remixのルート
        │  │      home.tsx      # ホーム画面
        │  │      index.tsx     # トップページ
        │  │      login.tsx     # ログイン画面
        │  │      mypage.tsx    # マイページ
        │  │      _index.tsx    # フォールバック用のルート
        │  │      
        │  └─utils              # ユーティリティ関数や共通ロジック
        │      │  cookies.ts    # クッキー操作用関数
        │      │  logger.ts     # ログ関連のユーティリティ関数
        │      │  types.ts      # 型定義を格納
        │      │  
        │      ├─apis           # API呼び出しロジック
        │      │      fetchLoginData.tsx  # ログインデータを取得するAPI
        │      │      fetchLogoutData.tsx # ログアウトデータを取得するAPI
        │      │      fetchUserData.tsx   # ユーザーデータを取得するAPI
        │      │      
        │      └─errors         # エラー定義
        │              AuthenticationError.tsx # 認証エラー
        │              
        ├─build                # ビルド成果物を格納
        ├─certs                # SSL証明書や鍵
        └─public               # 公開用の静的ファイル
                favicon.ico    # サイトのファビコン

```

# 環境構築手順
localhostをHTTPSで起動するためにcert.pemとkey.pemを生成する。
Windows端末でcert.pemとkey.pemを生成する方法は下記に記載。  
https://github.com/dbd-fish/react_sample/issues/12#issuecomment-2570993736

cert.pemとkey.pemを下記に格納。
`sample_frontend_container\sample_react-router\certs\cert.pem`
`sample_frontend_container\sample_react-router\certs\key.pem`

Docker環境を構築して下記コマンドを実行。
```Bash
docker-compose up --build
```

frontendコンテナを起動して下記コマンドを実行
```Bash
cd sample_react-router
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



