// NOTE: バックエンド連携するときに見直す必要あり
import LoggedInHeader from './header/LoggedInHeade';
import LoggedOutHeader from './header/LoggedOutHeader';
import { useLoaderData } from '@remix-run/react';

export default function Header() {
  // ローダー関数で取得したユーザー情報を取得
  // TODO: Loader関数の戻り値が多様化した場合に問題あり
  const user = useLoaderData<{ username: string; email: string }>();

  console.log('header user', user);

  // 認証状況に応じて表示を切り替える
  if (user) {
    return <LoggedInHeader />;
  } else {
    return <LoggedOutHeader />;
  }
}
