<<<<<<< HEAD
export default function HomePage() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold">Home Works</h1>
      <p>如果見到呢句，代表首頁路由正常，原組件有錯。</p>
    </main>
  );
=======
import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/zh');
>>>>>>> da4efc7 (fix: article page footer visibility, search/filter theme colors, navbar spacing, back-link i18n)
}
