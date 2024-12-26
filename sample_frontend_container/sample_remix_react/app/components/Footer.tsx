export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">&copy; 2024 My Website. All rights reserved.</p>
        <p className="text-xs mb-2">
          このサイトは個人情報を適切に管理しています。
        </p>
        <div className="flex justify-center space-x-4 text-sm">
          <a href="/privacy-policy" className="hover:underline">
            プライバシーポリシー
          </a>
          <a href="/terms-of-service" className="hover:underline">
            利用規約
          </a>
          <a href="/legal-notice" className="hover:underline">
            特定商取引法に基づく表記
          </a>
          <a href="/about-us" className="hover:underline">
            運営者情報
          </a>
          <a href="/contact" className="hover:underline">
            お問い合わせ
          </a>
        </div>
        <p className="text-xs mt-2">
          © 2024 My Website, Inc. またはその関連会社。
        </p>
      </div>
    </footer>
  );
}
