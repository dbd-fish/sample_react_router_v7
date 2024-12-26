import { useState, useRef } from 'react';
import SearchForm from './forms/SearchForm';
import SiteTitle from './SiteTitle';
import useClickOutside from '../hooks/useClickOutside';

export default function Header() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const userMenuRef = useRef<HTMLLIElement>(null);
  const notificationRef = useRef<HTMLLIElement>(null);

  // カスタムフックを使用して外部クリックを検知
  useClickOutside(userMenuRef, () => setShowUserMenu(false));
  useClickOutside(notificationRef, () => setShowNotification(false));

  const toggleUserMenu = () => setShowUserMenu(!showUserMenu);
  const toggleNotification = () => setShowNotification(!showNotification);

  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* サンプルサイト (SiteTitle コンポーネント) */}
        <SiteTitle />
        <nav className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
          {/* 分割したSearchFormコンポーネントを使用 */}
          <SearchForm />
          <ul className="flex flex-row items-center space-x-4">
            {/* 通知アイコン */}
            <li className="relative" ref={notificationRef}>
              <button
                onClick={toggleNotification}
                className="relative w-10 h-10 rounded-full bg-white flex justify-center items-center hover:bg-gray-200"
              >
                🔔
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                  3
                </span>
              </button>
              {showNotification && (
                <div className="absolute top-12 left-0 bg-white text-black rounded shadow-md w-64 p-4">
                  <p className="text-sm font-bold">新しい通知:</p>
                  <ul className="mt-2 space-y-1 text-sm">
                    <li>
                      <a
                        href="/notification/1"
                        className="text-blue-600 hover:underline"
                      >
                        通知1
                      </a>
                    </li>
                    <li>
                      <a
                        href="/notification/2"
                        className="text-blue-600 hover:underline"
                      >
                        通知2
                      </a>
                    </li>
                    <li>
                      <a
                        href="/notification/3"
                        className="text-blue-600 hover:underline"
                      >
                        通知3
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </li>
            {/* ユーザーアカウントアイコン */}
            <li className="relative" ref={userMenuRef}>
              <button
                onClick={toggleUserMenu}
                className="relative w-10 h-10 rounded-full bg-gray-300 flex justify-center items-center overflow-hidden"
              >
                <img
                  src="https://via.placeholder.com/150"
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </button>
              {showUserMenu && (
                <div className="absolute top-12 right-0 bg-white text-black rounded shadow-md w-48 p-4">
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a href="/" className="text-blue-600 hover:underline">
                        ホーム
                      </a>
                    </li>
                    <li>
                      <a
                        href="/settings"
                        className="text-blue-600 hover:underline"
                      >
                        設定
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
