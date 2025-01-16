import { redirect, type LoaderFunction, type MetaFunction } from 'react-router';

export const loader: LoaderFunction = async () => {
  return redirect('/home'); // 'home.tsx' にリダイレクト
};

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {}
