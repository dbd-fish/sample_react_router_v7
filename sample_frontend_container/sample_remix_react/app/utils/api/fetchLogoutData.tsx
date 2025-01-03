export const fetchLogoutData = async () => {
  console.log('fetchLogoutData: start'); // 関数開始時のログ

  // NOTE: processが使用できないため、API URLを直接指定
  // const apiUrl = process.env.API_URL || 'http://localhost:5173'; // 環境変数からURLを取得
  const apiUrl = 'http://localhost:5173'; // 環境変数からURL
  console.log('fetchLogoutData: apiUrl', apiUrl); // API URLのログ

  const response = await fetch(`${apiUrl}/api/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // HTTP-only Cookieを送信
  });

  if (response.ok) {
    console.log('fetchLogoutData: success'); // 成功時のログ
    return {}; // 必要に応じてデータを返す
  } else {
    const errorData = await response.json();
    console.error('fetchLogoutData: error', errorData); // エラー時のログ
    throw new Error(errorData.message || 'ログインに失敗しました');
  }
};
