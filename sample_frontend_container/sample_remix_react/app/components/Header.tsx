// NOTE: バックエンド連携するときに見直す必要あり
import { useState, useEffect } from 'react';
import LoggedInHeader from './header/LoggedInHeade';
import LoggedOutHeader from './header/LoggedOutHeader';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch('/auth-status', {
          method: 'GET',
          credentials: 'include', // クッキーを含めるための設定
        });

        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(data.isAuthenticated);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('認証状態の確認中にエラーが発生しました:', error);
        setIsLoggedIn(false);
      }
    };

    checkAuthStatus();
  }, []);

  return isLoggedIn ? <LoggedInHeader /> : <LoggedOutHeader />;
};

export default Header;
