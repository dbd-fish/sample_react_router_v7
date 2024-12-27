// sample_remix_react/app/components/common/ErrorMessage.tsx

import React, { useEffect } from 'react';

// プロパティの型定義
interface ErrorMessageProps {
  message: string; // 表示するエラーメッセージ
  onDismiss: () => void; // エラーメッセージを非表示にするためのコールバック関数
}

/**
 * ErrorMessage コンポーネント
 * - 一時的にエラーメッセージを表示し、一定時間後に自動で非表示にする。
 * - 親コンポーネントから `message` と `onDismiss` 関数を受け取る。
 *
 * @param {string} message - 表示するエラーメッセージの内容
 * @param {() => void} onDismiss - エラーメッセージを非表示にするコールバック
 */
const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onDismiss }) => {
  // エラーメッセージの表示時間を管理
  useEffect(() => {
    // 3秒後にエラーメッセージを非表示にする
    const timer = setTimeout(() => {
      onDismiss();
    }, 3000);

    // コンポーネントがアンマウントされたときにタイマーをクリア
    return () => clearTimeout(timer);
  }, [onDismiss]);

  // エラーメッセージの表示
  return (
    <div className="mb-4 text-red-500 text-center bg-red-100 p-2 rounded">
      {message}
    </div>
  );
};

export default ErrorMessage;
