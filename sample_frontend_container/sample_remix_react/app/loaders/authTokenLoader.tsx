import { AuthenticationError } from '../utils/errors/AuthenticationError';

/**
 * リクエストヘッダーから認証トークンを取得して検証します。
 *
 * この関数は、リクエストヘッダー内のクッキーを解析して`authToken`を抽出します。
 * `authToken` が存在しない場合は認証エラーをスローします。
 *
 * @param {Request} request - 必要なヘッダーやクッキーを含むHTTPリクエストオブジェクト。
 * @throws {AuthenticationError} 認証トークン (`authToken`) が見つからない場合にスローされます。
 * @returns {Promise<void>} 成功した場合、特に値は返しません。
 */
export async function authTokenLoader(request: Request) {
  // HTTP-only クッキーの取得
  const cookieHeader = request.headers.get('Cookie');
  console.log('Loader: Incoming cookies:', cookieHeader);

  // authToken と csrfToken をクッキーから抽出
  const authTokenMatch = cookieHeader?.match(/authToken=([^;]+)/);
  const csrfTokenMatch = cookieHeader?.match(/csrftoken=([^;]+)/);

  const authToken = authTokenMatch ? authTokenMatch[1] : null;
  const csrfToken = csrfTokenMatch ? csrfTokenMatch[1] : null;

  console.log('Loader: Extracted authToken:', authToken);
  console.log('Loader: Extracted csrfToken:', csrfToken);

  // authToken が存在しない場合はログインページへリダイレクト
  // NOTE: Actionへレスポンスとしてリダイレクトを返すことは可能だが、Loaderへリダイレクトを返すことができないため、エラーをスローする
  if (!authToken) {
    console.log('Loader: Missing authToken, redirecting to login.');
    throw new AuthenticationError('認証トークンが見つかりません。');
  }

  return;
}
