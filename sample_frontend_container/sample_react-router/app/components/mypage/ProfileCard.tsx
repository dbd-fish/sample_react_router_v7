import { LoaderDataType } from '~/utils/types';
import { useLoaderData } from 'react-router';

export default function ProfileCard() {
  const loaderData = useLoaderData<LoaderDataType>();
  const user = loaderData.user;

  return (
    <div className="w-full md:w-1/3 bg-white rounded-lg shadow-lg p-6 text-center">
      <img
        src="https://via.placeholder.com/150"
        alt="Profile"
        className="w-24 h-24 mx-auto rounded-full shadow-md mb-4"
      />
      <h2 className="text-lg font-semibold text-gray-700">{user?.username}</h2>
      <p className="text-sm text-gray-500">メールアドレス: {user?.email}</p>
      <button className="mt-4 w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        プロフィール編集
      </button>
    </div>
  );
}
