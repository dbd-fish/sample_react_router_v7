import { loginHandler } from './loginHandler';
import { getMeHandler } from './getMeHandler';

// 他のハンドラーもここでインポート
// import { exampleHandler } from './exampleHandler';

export const handlers = [
  loginHandler,
  getMeHandler,
  // 他のハンドラーもここに追加
  // exampleHandler,
];
