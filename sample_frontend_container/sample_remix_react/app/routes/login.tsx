import LoginForm from '../components/forms/LoginForm';

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          サンプルアプリケーション
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}
