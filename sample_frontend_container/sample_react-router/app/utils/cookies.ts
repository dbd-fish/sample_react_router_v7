import { createCookie } from 'react-router';

// NOTE:ブラウザの開発者モードでHttpOnlyのクッキーを確認できる

// authToken破棄用のCookie
export const authTokenCookie = createCookie('authToken', {
  httpOnly: true,
  secure: true,
  sameSite: 'lax',
  path: '/',
  maxAge: 0, // クッキーを削除
});

// authToken作成用のCookie
export const authCookie = createCookie('authToken', {
  httpOnly: true,
  secure: true,
  sameSite: 'lax',
  path: '/',
  maxAge: 60 * 60 * 24, // 1日
});
