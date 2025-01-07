import { AuthenticationError } from '../utils/errors/AuthenticationError';
import { fetchUserData } from '../utils/apis/fetchUserData';
/**
 * 外部APIから認証情報を取得します。
 *
 * @param {Request} request - 必要なヘッダーやクッキーを含むHTTPリクエストオブジェクト。
 * @param {boolean} [loginRequired=true] - 呼び出し元がログインを必須とするかどうかを示すフラグ。
 *     true の場合、認証情報が取得できないとエラーをスローします。
 * @throws {AuthenticationError} 認証情報が見つからず、`loginRequired` が true の場合にスローされます。
 * @returns {Promise<any>} 取得した認証情報。
 *
 */
export async function userDataLoader(
  request: Request,
  loginRequired: boolean = true,
) {
  // 外部API呼び出し
  console.log('Loader: Fetching user data with authToken...');
  const userData = await fetchUserData(request);
  console.log('Loader: Retrieved user data:', userData);

  // ログインが必須の画面では下記でエラーがスローされる
  if (loginRequired && !userData) {
    console.error('Loader: User data not found.');
    throw new AuthenticationError('認証情報の取得に失敗しました。');
  }

  return userData;
}
