import { Link } from 'react-router';

export default function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link to="/">ホーム</Link>
        </li>
        <li>
          <Link to="/login">ログイン</Link>
        </li>
        <li>
          <Link to="/mypage">マイページ</Link>
        </li>
      </ul>
    </nav>
  );
}
