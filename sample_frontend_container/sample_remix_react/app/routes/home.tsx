import Header from '../components/Header';
import Footer from '../components/Footer';
import { LoaderFunction, ActionFunction, redirect } from '@remix-run/node';
import { userDataLoader } from '../loader/userDataLoader';

/**
 * ローダー関数:
 * - サーバーサイドで実行され、ユーザー情報を取得
 * - 成功時: ユーザー情報を返す
 * - 失敗時: 401エラーをスロー
 */
export const loader: LoaderFunction = async ({ request }) => {
  try {
    const userData = await userDataLoader(request);
    // // HTTP-only クッキーの取得
    // const cookieHeader = request.headers.get('Cookie');
    // console.log('Loader: Incoming cookies:', cookieHeader);

    // // authToken と csrfToken をクッキーから抽出
    // const authTokenMatch = cookieHeader?.match(/authToken=([^;]+)/);
    // const csrfTokenMatch = cookieHeader?.match(/csrftoken=([^;]+)/);

    // const authToken = authTokenMatch ? authTokenMatch[1] : null;
    // const csrfToken = csrfTokenMatch ? csrfTokenMatch[1] : null;

    // console.log('Loader: Extracted authToken:', authToken);
    // console.log('Loader: Extracted csrfToken:', csrfToken);

    // // authToken が存在しない場合はログインページへリダイレクト
    // if (!authToken) {
    //   console.log('Loader: Missing authToken, redirecting to login.');
    //   return redirect('/login');
    // }

    // // 外部API呼び出し
    // console.log('Loader: Fetching user data with authToken...');
    // const userData = await fetchUserData(request);
    // console.log('Loader: Retrieved user data:', userData);

    // // 正常なレスポンスを返す
    return new Response(JSON.stringify(userData), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Loader Error:', error);
    throw new Response('ユーザーデータの取得に失敗しました。', {
      status: 400,
    });
  }
};
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-100 flex items-center justify-center">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-8">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-6">
            <div className="w-full md:w-2/3 bg-gray-50 rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">
                ホーム画面
              </h2>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
