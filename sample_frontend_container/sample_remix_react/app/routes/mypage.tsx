// sample_frontend_container/sample_remix_react/app/routes/mypage.tsx

import { LoaderFunction, ActionFunction, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
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
export const loader: LoaderFunction = async ({ request }) => {
  try {
    // HTTP-only クッキーの取得
    const cookieHeader = request.headers.get('Cookie');
    console.log('Loader: Incoming cookies:', cookieHeader);

    // authToken と csrfToken をクッキーから抽出
    const authTokenMatch = cookieHeader?.match(/authToken=([^;]+)/);
    const csrfTokenMatch = cookieHeader?.match(/csrftoken=([^;]+)/);

    const authToken = authTokenMatch ? authTokenMatch[1] : null;
    const csrfToken = csrfTokenMatch ? csrfTokenMatch[1] : null;

    console.log('Loader: Extracted authToken:', authToken);
    console.log('Loader: Extracted csrfToken:', csrfToken);

    // authToken が存在しない場合はログインページへリダイレクト
    if (!authToken) {
      console.log('Loader: Missing authToken, redirecting to login.');
      return redirect('/login');
    }

    // 外部API呼び出し
    console.log('Loader: Fetching user data with authToken...');
    const userData = await fetchUserData(request);
    console.log('Loader: Retrieved user data:', userData);

    // 正常なレスポンスを返す
    return new Response(JSON.stringify(userData), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Loader: Error occurred:', error);
    return new Response('Unauthorized', { status: 401 });
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
      await fetchLogoutData();

      console.log('Action: Removing authToken and csrfToken cookies...');
      // クッキーを削除するレスポンスヘッダーを作成
      const headers = new Headers();
      headers.append(
        'Set-Cookie',
        'authToken=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0',
      );
      // headers.append(
      //   'Set-Cookie',
      //   'csrftoken=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0',
      // );

      console.log('Action: Redirecting to login page...');
      return new Response(null, {
        status: 302,
        headers: {
          ...headers,
          Location: '/login',
        },
      });
    } catch (error) {
      console.error('Action: Error during logout:', error);
      return new Response(
        JSON.stringify({ error: 'ログアウトに失敗しました' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }
  }

  console.log('Action: No valid actionType provided.');
  return new Response(JSON.stringify({ error: '無効なアクションタイプです' }), {
    status: 400,
    headers: { 'Content-Type': 'application/json' },
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
