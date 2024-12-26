export function validateEmail(email: string): string | undefined {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return '有効なメールアドレスを入力してください';
  }
}

export function validatePassword(password: string): string | undefined {
  if (password.length < 8) {
    return 'パスワードは8文字以上である必要があります';
  }
}
