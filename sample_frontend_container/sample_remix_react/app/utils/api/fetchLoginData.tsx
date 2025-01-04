/**
 * ユーザーのログインを処理する非同期関数
 * - '/api/login' エンドポイントを使用してログインリクエストを送信
 * - 成功時: 空オブジェクトを返す（または必要な情報を返す）
 * - 失敗時: エラーメッセージをスロー
 *
 * @param email - ユーザーのメールアドレス
 * @param password - ユーザーのパスワード
 */
export const fetchLoginData = async (email: string, password: string) => {
  console.log('fetchLoginData: start'); // 関数開始時のログ

  // NOTE: processが使用できないため、API URLを直接指定
  // const apiUrl = process.env.API_URL || 'http://localhost:5173'; // 環境変数からURLを取得
  const apiUrl = 'http://localhost:5173'; // 環境変数からURL
  console.log('fetchLoginData: apiUrl', apiUrl); // API URLのログ

  const response = await fetch(`${apiUrl}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }), // フォームデータをJSON形式に変換
    credentials: 'include', // HTTP-only Cookieを送信
  });

  if (response.ok) {
    console.log('fetchLoginData: success'); // 成功時のログ
    return {}; // 必要に応じてデータを返す
  } else {
    const errorData = await response.json();
    console.error('fetchLoginData: error', errorData); // エラー時のログ
    throw new Error(errorData.message || 'ログインに失敗しました');
  }
};
