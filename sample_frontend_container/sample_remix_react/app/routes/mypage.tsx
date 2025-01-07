// sample_frontend_container/sample_remix_react/app/routes/mypage.tsx

import { LoaderFunction, ActionFunction, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProfileCard from '../components/mypage/ProfileCard';
import { fetchLogoutData } from '../utils/api/fetchLogoutData';
import { authTokenCookie } from '../utils/cookies';
import { userDataLoader } from '../loader/userDataLoader';
import { authTokenLoader } from '../loader/authTokenLoader';
import { AuthenticationError } from '../utils/errors/AuthenticationError';

/**
 * ローダー関数:
 * - サーバーサイドで実行され、ユーザー情報を取得
 * - 成功時: ユーザー情報を返す
 * - 失敗時: 401エラーをスロー
 */
export const loader: LoaderFunction = async ({ request }) => {
  try {
    await authTokenLoader(request);
    const userData = await userDataLoader(request);

    // 正常なレスポンスを返す
    return new Response(JSON.stringify(userData), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    if (error instanceof AuthenticationError) {
      console.log('Loader: AuthenticationError:');
      return redirect('/login');
    }
    console.error('Loader Error:', error);

    throw new Response('ユーザーデータの取得に失敗しました。', {
      status: 400,
    });
  }
};

// NOTE: ログアウトが必要な画面ではこれと似たAction関数を実装する必要あり
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const actionType = formData.get('_action');

  console.log('Action: Received actionType:', actionType);

  if (actionType === 'logout') {
    try {
      console.log('Action: Calling fetchLogoutData...');
      // ログアウトAPIを呼び出し
      const response = await fetchLogoutData();
      // デバック用: レスポンスの内容をコンソールに出力
      const authToken = response.headers.get('set-cookie'); // 仮定: fetchLoginDataがauthTokenを返す
      console.log('Action: Received AuthToken:', authToken);

      // デバック用: クライアントから送信された既存のクッキーを取得
      const existingCookiesHeader = request.headers.get('Cookie');
      console.log('Action: Incoming cookies:', existingCookiesHeader);

      // Cookieを破棄するためにmax-age=0のCookieを作成
      const setCookieHeader = await authTokenCookie.serialize('', {});

      return redirect('/login', {
        headers: {
          'Set-Cookie': setCookieHeader,
        },
      });
    } catch (error) {
      console.error('Action: Error during logout:', error);
      throw new Response('サーバー上で不具合が発生しました', {
        status: 400,
      });
    }
  }

  console.log('Action: No valid actionType provided.');
  throw new Response('サーバー上で不具合が発生しました', {
    status: 400,
  });
};

/**
 * マイページコンポーネント:
 * - ユーザー情報を表示するページ
 */
export default function MyPage() {
  const loaderData = useLoaderData<{ username: string; email: string }>();
  console.log('MyPage loaderData', loaderData);

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
                名前: {loaderData.username}
                <br />
                メール: {loaderData.email}
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
