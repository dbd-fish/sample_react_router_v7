import { useState, useRef, useCallback } from 'react';
import SearchForm from '~/components/forms/SearchForm'; // 検索フォームのコンポーネントをインポート
import SiteTitle from '~/components/SiteTitle'; // サイトタイトル用のコンポーネントをインポート
import useClickOutside from '~/hooks/useClickOutside'; // 外部クリック検知用のカスタムフックをインポート
import { useLoaderData, useSubmit } from 'react-router';
import { LoaderDataType } from '~/utils/types';

/**
 * ヘッダーコンポーネント
 * - サイト全体のヘッダーとして機能
 * - ユーザー情報、通知、検索フォームを含む
 */
export default function Header() {
  // コンテキストからユーザー情報を取得
  const loaderData = useLoaderData<LoaderDataType>();
  const user = loaderData.user;

  const submit = useSubmit();
  // NOTE: このあたりの処理とAction関数の処理を確認する
  const handleLogout = useCallback(async () => {
    try {
      // フォームデータを作成
      const formData = new FormData();
      formData.append('_action', 'logout');

      // フォームを送信
      submit(formData, { method: 'post' });
      // ここでコンテキストを更新する
    } catch (error) {
      console.error('ログアウトに失敗しました:', error);
    }
  }, [submit]);

  // 通知メニューとユーザーメニューの表示状態を管理
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  // メニューのDOM要素を参照するためのRef
  const userMenuRef = useRef<HTMLLIElement>(null);
  const notificationRef = useRef<HTMLLIElement>(null);

  // カスタムフックを使用して外部クリックを検知
  // ユーザーメニューが開いているときに外部クリックで閉じる
  useClickOutside(userMenuRef, () => setShowUserMenu(false));
  // 通知メニューが開いているときに外部クリックで閉じる
  useClickOutside(notificationRef, () => setShowNotification(false));

  // ユーザーメニューの開閉を切り替える
  const toggleUserMenu = () => setShowUserMenu(!showUserMenu);

  // 通知メニューの開閉を切り替える
  const toggleNotification = () => setShowNotification(!showNotification);

  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* サイトタイトル */}
        <SiteTitle />
        {/* ユーザー情報を表示 */}
        <span>こんにちは、{user?.username}さん</span>

        <nav className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
          {/* 検索フォーム */}
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
                {/* 仮のユーザーアバター画像 */}
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
                    <li>
                      {/* ログアウトボタン */}
                      <button
                        onClick={handleLogout} // カスタムフックから取得したログアウト処理を実行
                        className="text-red-600 hover:underline w-full text-left"
                      >
                        ログアウト
                      </button>
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
