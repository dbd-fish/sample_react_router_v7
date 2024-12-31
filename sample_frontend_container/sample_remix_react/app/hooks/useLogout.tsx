import { useNavigate } from '@remix-run/react';
import { useUser } from '../context/UserContext';

/**
 * useLogout:
 * - ログアウト処理をカスタムフックとして提供
 * - サーバー側のセッションを終了し、ユーザー情報をリセット
 * - ログインページへリダイレクト
 */
export const useLogout = () => {
  const { setUser } = useUser(); // コンテキストからユーザー更新関数を取得
  const navigate = useNavigate(); // ルーティング操作用

  /**
   * ログアウト処理
   */
  const logout = async () => {
    try {
      // サーバーにログアウトリクエストを送信
      await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include', // Cookieを送信
      });

      // ユーザー情報をリセット
      setUser(null);

      // ログインページへリダイレクト
      navigate('/login');
    } catch (error) {
      console.error('ログアウトに失敗しました:', error);
    }
  };

  return logout; // ログアウト関数を返却
};
