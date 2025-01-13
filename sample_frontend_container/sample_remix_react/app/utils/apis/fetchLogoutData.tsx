// import logger from '~/utils/logger';

/**
 * ユーザーのログアウトを処理する非同期関数
 * - '/api/logout' エンドポイントを使用してログアウトリクエストを送信
 * - 成功時: レスポンスを返す
 * - 失敗時: エラーメッセージをスロー
 */
export const fetchLogoutData = async () => {
  // logger.info('[fetchLogoutData] start');

  // NOTE: processが使用できないため、API URLを直接指定
  // const apiUrl = process.env.API_URL || 'http://localhost:5173'; // 環境変数からURLを取得
  const apiUrl = 'http://localhost:5173'; // API URLを直接指定
  // logger.debug('[fetchLogoutData] API URL', { apiUrl: apiUrl });

  try {
    const response = await fetch(`${apiUrl}/api/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // HTTP-only Cookieを送信
    });

    if (response.ok) {
      // logger.info('[fetchLogoutData] Logout successful');
      return response; // 必要に応じてデータを返す
    } else {
      const errorData = await response.json();
      // logger.warn('[fetchLogoutData] Logout failed', { errorData: errorData });

      throw new Error(errorData.message || 'ログアウトに失敗しました');
    }
  } catch (error) {
    // logger.error('[fetchLogoutData] Unexpected error occurred', {
    //   error: error,
    // });

    throw error;
  } finally {
    // logger.info('[fetchLogoutData] end');
  }
};
