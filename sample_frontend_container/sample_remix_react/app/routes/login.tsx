import React, { useState } from 'react';
import LoginForm from '../components/forms/LoginForm'; // ログインフォームコンポーネントのインポート
import ErrorMessage from '../components/ErrorMessage'; // エラーメッセージコンポーネントのインポート

/**
 * Login コンポーネント
 * - ユーザーがログインするための画面を提供
 * - ログインフォームを表示し、エラーメッセージを管理
 * - ログイン失敗時にエラーメッセージを一時的に表示
 */
export default function Login() {
  // エラーメッセージを管理する状態
  const [error, setError] = useState<string | null>(null);

  /**
   * エラーメッセージを非表示にするコールバック関数
   * - ErrorMessage コンポーネントから呼び出される
   */
  const handleDismiss = () => {
    setError(null); // エラー状態をリセット
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* メインのログイン画面コンテナ */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        {/* ログイン画面のタイトル */}
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          サンプルアプリケーション
        </h1>

        {/* エラーメッセージの表示 */}
        {/* errorが存在する場合に ErrorMessage コンポーネントを表示 */}
        {error && <ErrorMessage message={error} onDismiss={handleDismiss} />}

        {/* ログインフォームコンポーネント */}
        {/* setError をプロパティとして渡し、フォームでエラーが発生した際にメッセージを設定 */}
        <LoginForm setError={setError} />
      </div>
    </div>
  );
}
