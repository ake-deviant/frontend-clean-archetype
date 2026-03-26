import { getAllArticlesUseCase, getAllArticlesPresenter } from '@/di/container';
import { ArticleList } from '@/components/article/ArticleList';
import { AuthBar } from '@/components/auth/AuthBar';

export default async function HomePage() {
  const result = await getAllArticlesUseCase.execute();
  const articles = result.isOk ? getAllArticlesPresenter.present(result.value) : [];

  return (
    <>
      <header>
        <h1>Frontend Archetype — Next.js</h1>
        <AuthBar />
      </header>
      <main>
        <ArticleList articles={articles} />
      </main>
    </>
  );
}
