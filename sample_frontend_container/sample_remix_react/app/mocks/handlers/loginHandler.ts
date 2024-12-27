// MSW（Mock Service Worker）から必要なモジュールをインポート
import { http, HttpResponse } from 'msw';

// ログインリクエストのボディの型定義
export interface LoginRequestBody {
  email: string; // ユーザーのメールアドレス
  password: string; // ユーザーのパスワード
}

// /api/login エンドポイントへのPOSTリクエストを処理するハンドラーを定義
export const loginHandler = http.post('/api/login', async ({ request }) => {
  try {
    // リクエストのJSONボディをパースし、LoginRequestBody型として扱う
    const { email, password } = (await request.json()) as LoginRequestBody;

    // 受け取ったメールアドレスとパスワードをコンソールに出力（デバッグ目的）
    console.log('Received email:', email);
    console.log('Received password:', password);

    // 本来はここでメールアドレスとパスワードの検証を行う（例：データベースとの照合）
    // 検証が成功したと仮定して、JWT（JSON Web Token）を生成
    const jwt = 'your_jwt_token'; // 実際の実装では、適切な方法でJWTを生成してください

    // クッキーの設定を定義
    const setCookieHeader = `authToken=${jwt}; HttpOnly; Secure; SameSite=Lax; Path=/`;

    // 成功レスポンスを返す
    return new HttpResponse(
      // レスポンスボディとしてJSON形式のメッセージを設定
      JSON.stringify({ message: 'Logged in successfully' }),
      {
        // HTTPステータスコードを302（Found）に設定し、リダイレクトを示す
        status: 302,
        headers: {
          'Content-Type': 'application/json', // レスポンスの内容がJSONであることを示す
          'Set-Cookie': setCookieHeader, // クライアントにJWTを含むクッキーを設定
        },
      },
    );
  } catch (error) {
    // リクエストボディのパース中にエラーが発生した場合の処理
    console.error('Error parsing request body:', error);

    // エラーレスポンスを返す
    return new HttpResponse(
      // エラーメッセージをJSON形式で設定
      JSON.stringify({ message: 'Invalid request body' }),
      {
        status: 400, // HTTPステータスコードを400（Bad Request）に設定
        headers: {
          'Content-Type': 'application/json', // レスポンスの内容がJSONであることを示す
        },
      },
    );
  }
});
