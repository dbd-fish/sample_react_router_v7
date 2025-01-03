// sample_frontend_container/sample_remix_react/app/routes/mypage.tsx

import { LoaderFunction, ActionFunction, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useEffect } from 'react';
import { useUser } from '../context/UserContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProfileCard from '../components/mypage/ProfileCard';
import { fetchUserData } from '../utils/api/fetchUserData';
// import { useAuth } from '../hooks/useAuth';
import { fetchLogoutData } from '../utils/api/fetchLogoutData';

/**
 * ローダー関数:
 * - サーバーサイドで実行され、ユーザー情報を取得
 * - 成功時: ユーザー情報を返す
 * - 失敗時: 401エラーをスロー
 */
export const loader: LoaderFunction = async () => {
  try {
    const userData = await fetchUserData();
    return new Response(JSON.stringify(userData), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.log('loader error', error);
    throw new Response('Unauthorized', { status: 401 });
  }
};

// NOTE: ログアウトが必要な画面ではこれと似たAction関数を実装する必要あり
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const actionType = formData.get('_action');
  if (actionType === 'logout') {
    // ログアウトAPIを呼び出し
    // NOTE: アクション内でカスタムフックをよびだせない。
    await fetchLogoutData();
    return redirect('/login');
  }
  console.log('actionType', actionType);
  return null;
};

/**
 * マイページコンポーネント:
 * - ユーザー情報を表示するページ
 */
export default function MyPage() {
  const loaderData = useLoaderData<{ username: string; email: string }>();
  const { user, setUser } = useUser();

  useEffect(() => {
    if (loaderData) {
      setUser(loaderData); // ユーザー情報を更新
    }
  }, [loaderData, setUser]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* ユーザー情報がヘッダーで使用可能 */}
      <Header />
      <main className="flex-grow bg-gray-100 flex items-center justify-center">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-8">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-6">
            <ProfileCard />
            <div className="w-full md:w-2/3 bg-gray-50 rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">概要</h2>
              <p className="text-gray-600">
                名前: {user?.username}
                <br />
                メール: {user?.email}
                <br />
                あなたのアカウント情報や、活動の概要をここに表示します。好きな項目をクリックして更新したり、詳細を確認してください。
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
