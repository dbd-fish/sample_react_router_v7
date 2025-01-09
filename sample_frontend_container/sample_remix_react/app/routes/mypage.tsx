// sample_frontend_container/sample_remix_react/app/routes/mypage.tsx

import { LoaderFunction, ActionFunction, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProfileCard from '../components/mypage/ProfileCard';
import { userDataLoader } from '../loaders/userDataLoader';
import { authTokenLoader } from '../loaders/authTokenLoader';
import { AuthenticationError } from '../utils/errors/AuthenticationError';
import { logoutAction } from '../actions/logoutAction';
import logger from '../utils/logger';

/**
 * ローダー関数:
 * - サーバーサイドで実行され、ユーザー情報を取得
 * - 成功時: ユーザー情報を返す
 * - 失敗時: 401エラーをスロー
 */
export const loader: LoaderFunction = async ({ request }) => {
  logger.info('[MyPage Loader] start');
  try {
    await authTokenLoader(request);
    const userData = await userDataLoader(request);

    logger.info('[MyPage Loader] Successfully retrieved user data');
    logger.debug('[MyPage Loader] User data', { userData: userData });

    // 正常なレスポンスを返す
    return new Response(JSON.stringify(userData), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    if (error instanceof AuthenticationError) {
      logger.warn('[MyPage Loader] AuthenticationError occurred');
      return redirect('/login');
    }

    logger.error('[MyPage Loader] Unexpected error occurred', {
      error: error
    });

    throw new Response('ユーザーデータの取得に失敗しました。', {
      status: 400,
    });
  } finally {
    logger.info('[MyPage Loader] end');
  }
};

/**
 * アクション関数:
 * - クライアントからのアクションを処理
 * - ログアウトやその他のアクションを処理
 */
export const action: ActionFunction = async ({ request }) => {
  logger.info('[MyPage Action] start');
  try {
    const formData = await request.formData();
    const actionType = formData.get('_action');

    logger.debug('[MyPage Action] Received actionType', { actionType: actionType });

    if (actionType === 'logout') {
      const response = await logoutAction(request);
      logger.info('[MyPage Action] Logout action processed successfully');
      return response;
    }

    logger.warn('[MyPage Action] No valid actionType provided');
    throw new Response('サーバー上で不具合が発生しました', {
      status: 400,
    });
  } catch (error) {
    logger.error('[MyPage Action] Unexpected error occurred', {
      error: error
    });
    throw new Response('サーバー上で予期しないエラーが発生しました', {
      status: 400,
    });
  } finally {
    logger.info('[MyPage Action] end');
  }
};

/**
 * マイページコンポーネント:
 * - ユーザー情報を表示するページ
 */
export default function MyPage() {
  const loaderData = useLoaderData<{ username: string; email: string }>();

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
