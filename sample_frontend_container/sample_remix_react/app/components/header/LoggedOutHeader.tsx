import SiteTitle from '~/components/SiteTitle';
import SearchForm from '~/components/forms/SearchForm';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* サンプルサイト (SiteTitle コンポーネント) */}
        <SiteTitle />
        <nav className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
          <ul className="flex flex-row items-center space-x-4">
            {/* 分割したSearchFormコンポーネントを使用 */}
            <SearchForm />
            {/* ログイン・サインアップボタン */}
            <li>
              <a
                href="/login"
                className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-gray-200 text-sm"
              >
                ログイン
              </a>
            </li>
            <li>
              <a
                href="/signup"
                className="px-4 py-2 bg-yellow-500 text-blue-800 rounded hover:bg-yellow-400 text-sm"
              >
                サインアップ
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
