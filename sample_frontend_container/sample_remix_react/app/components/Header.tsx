// NOTE: バックエンド連携するときに見直す必要あり
import LoggedInHeader from './header/LoggedInHeade';
import LoggedOutHeader from './header/LoggedOutHeader';
import { useUser } from '../context/UserContext'; // ユーザー情報を管理するコンテキストから情報を取得

const Header = () => {
  // コンテキストからユーザー情報を取得
  const { user } = useUser();
  // const  user  = null;

  // 認証状況に応じて表示を切り替える
  if (user) {
    return <LoggedInHeader />;
  } else {
    return <LoggedOutHeader />;
  }
};

export default Header;
