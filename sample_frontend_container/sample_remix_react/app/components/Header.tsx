// NOTE: バックエンド連携するときに見直す必要あり
import LoggedInHeader from './header/LoggedInHeade';
import LoggedOutHeader from './header/LoggedOutHeader';
import { useLoaderData } from '@remix-run/react';

export default function Header() {
  // コンテキストからユーザー情報を取得
  const user = useLoaderData<{ username: string; email: string }>();

  console.log('header user', user);

  // 認証状況に応じて表示を切り替える
  if (user) {
    return <LoggedInHeader />;
  } else {
    return <LoggedOutHeader />;
  }
}
