import { ActionFunction, json, redirect } from '@remix-run/node';
import { useActionData } from '@remix-run/react';
import LoginForm from '../components/forms/LoginForm';
import { fetchLoginData } from '../utils/api/fetchLoginData';

/**
 * ログインページのAction関数
 * - ユーザーがフォーム送信した内容を受け取り、認証APIを呼び出す
 */
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  try {
    await fetchLoginData(email, password);
    return redirect('/mypage'); // ログイン成功時にマイページへリダイレクト
  } catch (error: any) {
    return json(
      { error: error.message || 'ログインに失敗しました' },
      { status: 400 },
    );
  }
};

export default function LoginPage() {
  const actionData = useActionData<{ error?: string }>();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">

        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">ログイン</h1>
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
