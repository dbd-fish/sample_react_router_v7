import { useEffect } from 'react';
import { useNavigate } from '@remix-run/react';
import { useUser } from '../context/UserContext';

/**
 * useAuth:
 * - トークンを検証し、ユーザー情報を取得するカスタムフック
 * - コンテキストにユーザー情報を保存し、認証状態を管理
 */
export const useAuth = () => {
  const { user, setUser } = useUser(); // ユーザー情報と更新関数を取得
  const navigate = useNavigate(); // ルーティング操作用

  useEffect(() => {
    /**
     * validateToken:
     * - `/api/get/me` API を呼び出してトークンの有効性を確認
     * - 成功時: ユーザー情報をコンテキストに保存
     * - 失敗時: エラーメッセージをログ出力
     */
    const validateToken = async () => {
      try {
        const response = await fetch('/api/get/me', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include', // Cookieを送信
        });

        if (response.ok) {
          const data = await response.json();
          setUser({ username: data.username, email: data.email }); // ユーザー情報を保存
        } else {
          const errorData = await response.json();
          console.log('Error:', errorData);
          // navigate('/login'); // 必要に応じてリダイレクト
        }
      } catch (error) {
        console.error('Token validation failed:', error);
        // navigate('/login'); // 必要に応じてリダイレクト
      }
    };

    validateToken(); // トークン検証を実行
  }, [
    // navigate, // トリガー1: ルーティング操作用関数が変更されたとき
    // setUser, // トリガー2: ユーザー情報の更新関数が変更されたとき
  ]); // 依存配列に基づいてトリガーが発生

  return user; // 現在のユーザー情報を返却
};
