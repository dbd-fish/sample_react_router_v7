// import logger from '~/utils/logger';

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
  // logger.info('[fetchLoginData] start');

  // NOTE: processが使用できないため、API URLを直接指定
  // const apiUrl = process.env.API_URL || 'http://localhost:5173'; // 環境変数からURLを取得
  const apiUrl = 'http://localhost:5173'; // API URLを直接指定
  // logger.debug('[fetchLoginData] API URL', { apiUrl });

  try {
    const response = await fetch(`${apiUrl}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }), // フォームデータをJSON形式に変換
      credentials: 'include', // HTTP-only Cookieを送信
    });

    if (response.ok) {
      // レスポンスヘッダーからSet-Cookieヘッダーを取得
      // const setCookieHeader = response.headers.get('set-cookie');
      // logger.info('[fetchLoginData] Login successful');
      // logger.debug('[fetchLoginData] Set-Cookie header', { setCookieHeader: setCookieHeader });

      return response; // 必要に応じてデータを返す
    } else {
      const errorData = await response.json();
      // logger.warn('[fetchLoginData] Login failed', { errorData: errorData });

      throw new Error(errorData.message || 'ログインに失敗しました');
    }
  } catch (error) {
    // logger.error('[fetchLoginData] Unexpected error occurred', {
    //   error: error,
    // });

    throw error;
  } finally {
    // logger.info('[fetchLoginData] end');
  }
};
