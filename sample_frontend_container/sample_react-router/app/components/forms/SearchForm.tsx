import { useSubmit } from 'react-router';

export default function SearchForm() {
  const submit = useSubmit();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // デフォルトのフォーム送信を防ぐ
    const form = event.currentTarget; // フォーム要素を取得
    submit(form, { method: 'post' }); // useSubmitでPOSTリクエストを送信
  };

  return (
    <form
      onSubmit={handleSubmit}
      action="/article-search"
      method="POST"
      className="flex items-center"
    >
      <input
        type="text"
        name="query"
        placeholder="検索..."
        className="px-2 py-1 rounded text-black w-full md:w-auto"
      />
      <button className="w-1/4 md:w-auto ml-2 px-3 py-1 bg-white text-blue-600 rounded hover:bg-gray-200">
        検索
      </button>
    </form>
  );
}
