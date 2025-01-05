import { ActionFunction, redirect, json, createCookie } from '@remix-run/node';
import { useActionData } from '@remix-run/react';
import LoginForm from '../components/forms/LoginForm';
import { fetchLoginData } from '../utils/api/fetchLoginData';

// createCookie APIを利用して新しいクッキーを作成
const authCookie = createCookie('authToken', {
  httpOnly: true,
  secure: true,
  sameSite: 'lax',
  path: '/',
  maxAge: 60 * 60 * 24, // 1日
});

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    console.log('Action: Incoming cookies:', request.headers.get('Cookie'));

    // fetchLoginDataを呼び出して認証トークンを取得
    const response = await fetchLoginData(email, password);
    const authToken = response.headers.get('set-cookie'); // 仮定: fetchLoginDataがauthTokenを返す
    console.log('Action: Received AuthToken:', authToken);

    // クライアントから送信された既存のクッキーを取得
    const existingCookiesHeader = request.headers.get('Cookie');
    const existingCookies = existingCookiesHeader
      ? await authCookie.parse(existingCookiesHeader)
      : {};
    console.log('Action: Existing cookies:', existingCookies);

    // クッキーに新しい情報を追加
    const updatedCookies = {
      ...existingCookies,
      authToken, // 新しい認証トークンを追加
    };
    console.log('Action: Updated cookies:', updatedCookies);

    // シリアライズしてレスポンスに設定
    const setCookieHeader = await authCookie.serialize(updatedCookies);

    return redirect('/mypage', {
      headers: {
        'Set-Cookie': setCookieHeader,
      },
    });
  } catch (error) {
    console.error('Action: Error occurred:', error);
    return json({ error: 'ログインに失敗しました' }, { status: 400 });
  }
};

export default function LoginPage() {
  const actionData = useActionData<{ error?: string }>();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          ログイン
        </h1>
        {actionData?.error && (
          <div className="mb-4 text-sm text-red-500 border border-red-400 bg-red-100 px-4 py-2 rounded">
            {actionData.error}
          </div>
        )}
        {/* LoginFormコンポーネントを利用 */}
        <LoginForm />
      </div>
    </div>
  );
}
