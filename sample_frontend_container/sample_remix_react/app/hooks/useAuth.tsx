import { useEffect } from 'react';
import { useNavigate } from '@remix-run/react';
import { useUser } from '../context/UserContext';

export const useAuth = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  console.log('ddd useAuth:', user);  // ユーザー情報をログに出力
  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await fetch('/api/get/me', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }, // JSON形式のリクエストボディを指定
          credentials: 'include', // Cookieを送信
        });

        if (response.ok) {
          const data = await response.json();
          // コンテキストにemailとusernameを保存
          setUser({
            username: data.username,
            email: data.email,
          });
        } else {
          const errorData = await response.json();
          console.log('ddd errorData:', errorData);
          // navigate('/login'); // トークンが無効の場合はログインページへ
        }
      } catch (error) {
        console.error('Token validation failed:', error);
        console.log('ddd errorData:');
        // navigate('/login'); // エラー時もログインページへ
      } finally {
      }
    };

    validateToken();
  }, [navigate, setUser,]);

  return user;
};
