export interface ArticleListItem {
  id: string;
  name: string;
  description: string;
  price: number;
}

export type GetAllArticlesResponse = ArticleListItem[];
