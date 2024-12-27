import { useState } from 'react';

// LoginFormコンポーネントのプロパティ型定義
interface LoginFormProps {
  setError: (message: string) => void; // エラーを設定する関数を親コンポーネントから受け取る
}

/**
 * LoginForm コンポーネント
 * - ユーザーがメールアドレスとパスワードを入力してログインを試行するフォーム
 * - ログイン成功時には '/mypage' にリダイレクト
 * - ログイン失敗時にはエラーメッセージを親コンポーネントに伝える
 */
export default function LoginForm({ setError }: LoginFormProps) {
  // メールアドレスを管理する状態
  const [email, setEmail] = useState('');

  /**
   * フォーム送信時の処理
   * - ログインAPIにリクエストを送信
   * - レスポンスの結果に応じて処理を分岐
   * @param event フォームの送信イベント
   */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // フォームのデフォルト動作を無効化（ページのリロードを防ぐ）
    const formData = new FormData(event.currentTarget); // フォームデータを取得
    const email = formData.get('email') as string; // フォームからメールアドレスを取得
    const password = formData.get('password') as string; // フォームからパスワードを取得

    // リクエストボディに送信するデータを構築
    const loginData = { email, password };

    try {
      // ログインAPIにPOSTリクエストを送信
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, // JSON形式のリクエストボディを指定
        body: JSON.stringify(loginData), // フォームデータをJSON文字列に変換
        credentials: 'include', // HTTP-only Cookie を送信するために必要
      });

      if (response.ok) {
        // レスポンスが成功の場合、マイページにリダイレクト
        window.location.href = '/mypage';
      } else {
        // レスポンスが失敗の場合、エラーメッセージを取得して親コンポーネントに通知
        const errorData = await response.json();
        setError(errorData.message || 'ログインに失敗しました。');
      }
    } catch (error) {
      // ネットワークエラーなどの例外が発生した場合
      console.error('エラーが発生しました:', error);
      setError('ネットワークエラーが発生しました。');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* メールアドレス入力フィールド */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          メールアドレス
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // 入力値を状態に反映
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="example@example.com"
          required // 必須フィールド
        />
      </div>

      {/* パスワード入力フィールド */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          パスワード
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          placeholder="********"
          required // 必須フィールド
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
    </form>
  );
}
