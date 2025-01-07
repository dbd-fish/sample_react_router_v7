import Header from '../components/Header';
import Footer from '../components/Footer';
import { LoaderFunction, redirect } from '@remix-run/node';
import { userDataLoader } from '../loaders/userDataLoader';
import { AuthenticationError } from '../utils/errors/AuthenticationError';

/**
 * ローダー関数:
 * - サーバーサイドで実行され、ユーザー情報を取得
 * - 成功時: ユーザー情報を返す
 * - 失敗時: 401エラーをスロー
 */
export const loader: LoaderFunction = async ({ request }) => {
  try {
    const userData = await userDataLoader(request, false);

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
