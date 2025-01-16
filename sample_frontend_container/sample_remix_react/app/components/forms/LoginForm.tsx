import { Form } from 'react-router';

/**
 * LoginFormコンポーネント
 * - ユーザーがメールアドレスとパスワードを入力して送信するフォーム
 */
export default function LoginForm() {
  return (
    <Form id="login-form" method="post" className="space-y-6">
      {/* メールアドレス入力フィールド */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          メールアドレス
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="example@example.com"
          required
        />
      </div>

      {/* パスワード入力フィールド */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          パスワード
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="********"
          minLength={8}
          required
        />
      </div>

      {/* ログインボタン */}
      <div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          ログイン
        </button>
      </div>
    </Form>
  );
}
