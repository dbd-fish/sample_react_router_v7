import { useAuth } from '../hooks/useAuth';
import Header from '../components/header/LoggedInHeade';
import Footer from '../components/Footer';
import ProfileCard from '../components/mypage/ProfileCard';

export default function MyPage() {
  const user = useAuth(); // ユーザー情報を取得し、コンテキストを更新

  console.log('MyPage user:', user); // ユーザー情報をログに出力

  return (
    <div className="min-h-screen flex flex-col">
      {/* ユーザー情報がヘッダーで使用可能 */}
      <Header />
      <main className="flex-grow bg-gray-100 flex items-center justify-center">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-8">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-6">
            <ProfileCard />
            <div className="w-full md:w-2/3 bg-gray-50 rounded-lg p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-700 mb-4">概要</h2>
              <p className="text-gray-600">
                名前→{user?.username}
                メール→{user?.email}
                あなたのアカウント情報や、活動の概要をここに表示します。好きな項目をクリックして更新したり、詳細を確認してください。
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
