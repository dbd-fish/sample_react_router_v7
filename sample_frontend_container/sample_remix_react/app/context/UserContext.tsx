import React, { createContext, useContext, useEffect, useState } from 'react';

// ユーザー情報の型定義
/**
 * User:
 * - ユーザー情報を表す型を定義
 * - username: ユーザー名
 * - email: ユーザーのメールアドレス
 */
interface User {
  username: string;
  email: string;
}

// Contextの型定義
/**
 * UserContextType:
 * - Contextで管理するデータの型を定義
 * - user: 現在のユーザー情報を格納（ログインしていない場合はnull）
 * - setUser: ユーザー情報を更新するための関数
 */
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

// Contextを作成
/**
 * UserContext:
 * - ユーザー情報を保持するためのContext
 * - 初期値はundefinedとし、Provider外での利用を防ぐ
 */
const UserContext = createContext<UserContextType | undefined>(undefined);

// プロバイダーコンポーネント
/**
 * UserProvider:
 * - Contextにユーザー情報を供給するためのプロバイダー
 * - 子コンポーネント全体でユーザー情報を共有可能にする
 */
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // ユーザー情報を管理する状態
  /**
   * useState:
   * - user: 現在のユーザー情報を保持（初期値はnull）
   * - setUser: ユーザー情報を更新する関数
   */
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Contextを利用するフック
/**
 * useUser:
 * - Contextからユーザー情報と更新関数を取得するカスタムフック
 * - コンテキストが定義されていない場合（Provider外で使用した場合）にはエラーをスロー
 */
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);

  // Providerの外部でuseUserが使用された場合にエラーを投げる
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
};
