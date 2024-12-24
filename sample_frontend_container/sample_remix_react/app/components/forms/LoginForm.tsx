export default function LoginForm() {
  return (
    <form method="post">
      <label>
        メールアドレス:
        <input type="email" name="email" required />
      </label>
      <label>
        パスワード:
        <input type="password" name="password" required />
      </label>
      <button type="submit">ログイン</button>
    </form>
  );
}
