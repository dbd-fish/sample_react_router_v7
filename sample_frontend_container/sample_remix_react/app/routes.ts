import { type RouteConfig, route, index } from '@react-router/dev/routes';

export default [
  // ルートパスに対応するコンポーネント
  // index('./routes/index.tsx'),

  // その他のルート
  // route('', './routes/home.tsx'),

  route('home', './routes/home.tsx'),
  route('login', './routes/login.tsx'),
  route('mypage', './routes/mypage.tsx'),
] satisfies RouteConfig;
