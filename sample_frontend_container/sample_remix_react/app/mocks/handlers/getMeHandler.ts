import { http, HttpResponse } from 'msw';

// ユーザー情報のモックデータ
const MOCK_USER = {
  username: 'mockuser',
  email: 'mockuser@example.com',
};

// /api/get/me エンドポイントへのgetリクエストを処理するハンドラー
export const getMeHandler = http.post(
  'http://localhost:5173/api/get/me',
  ({ cookies }) => {
    // const cookieHeader = request.headers.get('Cookie');
    console.log('/api/get/me Cookies:', cookies);
    console.log('/api/get/me Cookies csrgToken:', cookies.csrftoken);

    // CookieからJWTを取得
    const authToken = cookies.authToken;
    console.log('/api/get/me Cookies authToken:', authToken);

    if (!authToken) {
      // JWTが存在しない場合はエラーレスポンスを返す
      console.log('/api/get/me not authToken');
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // const authToken = 'your_jwt_token';

    // NOTE: 本来はJWTの検証処理してJWTから認証情報を取り出すが、モックでは省略
    // JWTのバリデーション（簡略化）
    // if (authToken === 'your_jwt_token') {
    //   console.log('/api/get/me jwt yes', authToken);
    return HttpResponse.json(MOCK_USER, { status: 200 });
    // } else {
    //   console.log('/api/get/me jwt', authToken);
    //   return HttpResponse.json({ message: 'Invalid token' }, { status: 403 });
    // }
  },
);
