export default function Header() {
    return (
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">マイページ</h1>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="/" className="hover:underline">
                  ホーム
                </a>
              </li>
              <li>
                <a href="/settings" className="hover:underline">
                  設定
                </a>
              </li>
              <li>
                <a href="/logout" className="hover:underline">
                  ログアウト
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
  