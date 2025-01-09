import { redirect } from '@remix-run/node';
import { fetchLogoutData } from '../utils/apis/fetchLogoutData';
import { authTokenCookie } from '../utils/cookies';
import logger from '../utils/logger';

/**
 * ログアウト処理を実行するアクション関数。
 *
 * この関数は、ログアウトAPIを呼び出し、認証トークンを削除するための
 * クッキーを設定した後、ログインページにリダイレクトします。
 *
 * @param {Request} request - HTTPリクエストオブジェクト。クライアントから送信されたクッキーを含む。
 * @returns {Promise<Response>} ログインページへのリダイレクトレスポンス。
 *
 * @throws {Error} ログアウトAPI呼び出し中にエラーが発生した場合にスローされます。
 */
export async function logoutAction(request: Request) {
  logger.info('[logoutAction] start');
  try {
    logger.info('[logoutAction] Calling fetchLogoutData...');

    // ログアウトAPIを呼び出し
    const response = await fetchLogoutData();

    // デバッグ用: レスポンスの内容をコンソールに出力
    const authToken = response.headers.get('set-cookie'); // 仮定: fetchLoginDataがauthTokenを返す
    logger.debug('[logoutAction] Received AuthToken', { authToken: authToken });

    // デバッグ用: クライアントから送信された既存のクッキーを取得
    const existingCookiesHeader = request.headers.get('Cookie');
    logger.debug('[logoutAction] Incoming cookies', {
      existingCookiesHeader: existingCookiesHeader,
    });

    // Cookieを破棄するためにmax-age=0のCookieを作成
    const setCookieHeader = await authTokenCookie.serialize('', {});
    logger.debug('[logoutAction] Set-Cookie header:', {
      setCookieHeader: setCookieHeader,
    });

    return redirect('/login', {
      headers: {
        'Set-Cookie': setCookieHeader,
      },
    });
  } catch (error) {
    logger.error('[logoutAction] Error during logout', { error: error });
    throw error;
  } finally {
    logger.info('[logoutAction] end');
  }
}
