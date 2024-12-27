// MSW（Mock Service Worker）から必要なモジュールをインポート
import { http, HttpResponse } from 'msw';

// ログインリクエストのボディの型定義
export interface LoginRequestBody {
  email: string; // ユーザーのメールアドレス
  password: string; // ユーザーのパスワード
}

// 許可されたメールアドレスとパスワードを定義
const VALID_EMAIL = 'user@example.com';
const VALID_PASSWORD = 'securepassword';

// /api/login エンドポイントへのPOSTリクエストを処理するハンドラーを定義
export const loginHandler = http.post('/api/login', async ({ request }) => {
  try {
    // リクエストのJSONボディをパースし、LoginRequestBody型として扱う
    const { email, password } = (await request.json()) as LoginRequestBody;

    // 受け取ったメールアドレスとパスワードをコンソールに出力（デバッグ目的）
    console.log('Received email:', email);
    console.log('Received password:', password);

    // メールアドレスとパスワードの検証
    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      // 検証が成功した場合、JWT（JSON Web Token）を生成
      const jwt = 'your_jwt_token'; // 実際の実装では、適切な方法でJWTを生成してください

      // クッキーの設定を定義
      const setCookieHeader = `authToken=${jwt}; HttpOnly; Secure; SameSite=Lax; Path=/`;

      // 成功レスポンスを返す
      return new HttpResponse(
        // レスポンスボディとしてJSON形式のメッセージを設定
        JSON.stringify({ message: 'Logged in successfully' }),
        {
          // HTTPステータスコードを200（OK）に設定
          status: 200,
          headers: {
            'Content-Type': 'application/json', // レスポンスの内容がJSONであることを示す
            'Set-Cookie': setCookieHeader, // クライアントにJWTを含むクッキーを設定
          },
        },
      );
    } else {
      // 認証情報が無効な場合のエラーレスポンス
      return new HttpResponse(
        JSON.stringify({ message: 'ユーザ名またはパスワードが違います' }),
        {
          status: 401, // HTTPステータスコードを401（Unauthorized）に設定
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    }
  } catch (error) {
    // リクエストボディのパース中にエラーが発生した場合の処理
    console.error('Error parsing request body:', error);

    // エラーレスポンスを返す
    return new HttpResponse(
      JSON.stringify({ message: 'Invalid request body' }),
      {
        status: 400, // HTTPステータスコードを400（Bad Request）に設定
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }
});
