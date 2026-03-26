import { ArticleViewModel } from '@frontend-archetype/core';
import { Cart } from './Cart';

interface ArticleListProps {
  articles: ArticleViewModel[];
}

export function ArticleList({ articles }: ArticleListProps) {
  return <Cart articles={articles} />;
}
