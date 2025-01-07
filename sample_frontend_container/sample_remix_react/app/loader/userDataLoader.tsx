import { fetchUserData } from '../utils/api/fetchUserData';
import { redirect } from '@remix-run/node';
export class AuthenticationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthenticationError';
  }
}

export async function userDataLoader(request: Request) {
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
  // TODO: 未ログインでも閲覧できる画面も存在するため、ここまでの処理は別関数にするべきでは？
  if (!authToken) {
    console.log('Loader: Missing authToken, redirecting to login.');
    // return redirect('/login');
    throw new AuthenticationError('認証トークンが見つかりません。');
  }

  // 外部API呼び出し
  console.log('Loader: Fetching user data with authToken...');
  const userData = await fetchUserData(request);
  console.log('Loader: Retrieved user data:', userData);

  return userData;
}
