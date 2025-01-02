import { LoaderFunction } from '@remix-run/node';
import { useLoaderData, useNavigate } from '@remix-run/react';
import { useEffect } from 'react';
import { useUser } from '../context/UserContext';

/**
 * useAuth:
 * - ローダーから取得したユーザー情報をコンテキストに保存
 * - 認証状態を管理
 */
export const useAuth = () => {
  const { user, setUser } = useUser();

  const updateUser = (userData: { username: string; email: string }) => {
    setUser(userData); // ユーザー情報を更新
  };

  return { user, updateUser }; // ユーザー情報と更新関数を返却
};
