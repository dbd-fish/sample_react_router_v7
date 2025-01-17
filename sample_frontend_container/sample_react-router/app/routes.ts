import { type RouteConfig, route, index } from '@react-router/dev/routes';

export default [
  // ルートパスに対応するコンポーネント
  index('./routes/home.tsx'), // NOTE: 同一のtsxファイルを異なるルーティングに指定できないため、home.tsxはここのみで使用
  // その他のルート
  route('login', './routes/login.tsx'),
  route('mypage', './routes/mypage.tsx'),
] satisfies RouteConfig;
