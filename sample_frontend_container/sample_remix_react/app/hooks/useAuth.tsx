import { useEffect } from 'react';
import { useNavigate } from '@remix-run/react';
import { useUser } from '../context/UserContext';

export const useAuth = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  console.log('useAuth useAuth:', user); // ユーザー情報をログに出力
  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await fetch('/api/get/me', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }, // JSON形式のリクエストボディを指定
          credentials: 'include', // Cookieを送信
        });
        console.log('useAuth response', response);

        if (response.ok) {
          console.log('useAuth response.ok');
          const data = await response.json();
          // コンテキストにemailとusernameを保存
          setUser({
            username: data.username,
            email: data.email,
          });
        } else {
          console.log('useAuth response.ng');
          const errorData = await response.json();
          console.log('useAuth errorData:', errorData);
          // navigate('/login'); // トークンが無効の場合はログインページへ
        }
      } catch (error) {
        console.error('useAuth Token validation failed:', error);
        console.log('useAuth errorData:');
        // navigate('/login'); // エラー時もログインページへ
      }
    };

    validateToken();
  }, [navigate, setUser]);

  return user;
};
