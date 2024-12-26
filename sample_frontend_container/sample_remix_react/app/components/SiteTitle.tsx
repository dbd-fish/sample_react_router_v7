import { Link } from '@remix-run/react';

export default function SiteTitle() {
  return (
    <Link to="/" className="text-xl font-bold mb-2 md:mb-0 hover:underline">
      サンプルサイト
    </Link>
  );
}
