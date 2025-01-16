import { ActionFunction, redirect } from 'react-router';
import { useActionData } from 'react-router';
import LoginForm from '~/components/forms/LoginForm';
import { fetchLoginData } from '~/utils/apis/fetchLoginData';
import { authCookie } from '~/utils/cookies';
// import logger from '~/utils/logger';

/**
 * ログインアクション関数:
 * - フォームから送信されたメールアドレスとパスワードを使用して認証を試行。
 * - 認証成功時: トークンをCookieに設定してリダイレクト。
 * - 認証失敗時: エラーメッセージを返す。
 */
export const action: ActionFunction = async ({ request }) => {
  // logger.info('[Login Action] start');
  const formData = await request.formData();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // logger.debug('[Login Action] Received form data', { email: email, password: password });

  try {
    // fetchLoginDataを呼び出して認証トークンを取得
    const response = await fetchLoginData(email, password);
    const authToken = response.headers.get('set-cookie'); // 仮定: fetchLoginDataがauthTokenを返す

    // logger.info('[Login Action] Received AuthToken');
    // logger.debug('[Login Action] AuthToken', { authToken: authToken });

    // シリアライズしてレスポンスに設定
    const setCookieHeader = await authCookie.serialize(authToken);

    // logger.info(
    //   '[Login Action] Authentication successful, redirecting to /mypage',
    // );
    return redirect('/mypage', {
      headers: {
        'Set-Cookie': setCookieHeader,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    // logger.error('[Login Action] Error occurred', {
    //   error: error
    // });

    return new Response(JSON.stringify({ error: 'ログインに失敗しました' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    // logger.info('[Login Action] end');
  }
};

/**
 * ログインページ:
 * - フォームを表示し、認証を行う。
 * - 認証失敗時にはエラーメッセージを表示。
 */
export default function LoginPage() {
  const actionData = useActionData<{ error?: string }>();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          ログイン
        </h1>
        {actionData?.error && (
          <div
            id="error-message"
            className="mb-4 text-sm text-red-500 border border-red-400 bg-red-100 px-4 py-2 rounded"
          >
            {actionData.error}
          </div>
        )}
        {/* LoginFormコンポーネントを利用 */}
        <LoginForm />
      </div>
    </div>
  );
}
