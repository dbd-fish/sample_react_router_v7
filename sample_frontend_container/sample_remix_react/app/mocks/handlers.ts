import { http, HttpResponse } from 'msw';

export interface LoginRequestBody {
  email: string;
  password: string;
}

export const handlers = [
  // /api/login の POST リクエストハンドラーを追加
  http.post('/api/login', async ({ request }) => {
    try {
      // リクエストボディをパースし、型アサーションを行う
      const { email, password } = (await request.json()) as LoginRequestBody;

      // 取得した email と password をコンソールに出力
      console.log('Received email:', email);
      console.log('Received password:', password);

      // ここで email と password の検証を行う（例: データベースと照合）
      // 検証が成功した場合、JWT を生成
      const jwt = 'your_jwt_token'; // 実際には適切な方法で JWT を生成してください

      // クッキーの設定
      const setCookieHeader = `authToken=${jwt}; HttpOnly; Secure; SameSite=Lax; Path=/`;

      // レスポンスを返す
      return new HttpResponse(
        JSON.stringify({ message: 'Logged in successfully' }),
        {
          status: 302, // リダイレクトのステータスコード
          headers: {
            'Content-Type': 'application/json',
            'Set-Cookie': setCookieHeader,
            Location: '/mypage', // リダイレクト先のURL
          },
        },
      );
    } catch (error) {
      console.error('Error parsing request body:', error);
      return new HttpResponse(
        JSON.stringify({ message: 'Invalid request body' }),
        {
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }
  }),

  // 他のエンドポイントもここに追加できます
];
