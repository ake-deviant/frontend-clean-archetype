export interface GetArticleQuery {
  articleId: string;
}

export interface GetArticleResponse {
  id: string;
  name: string;
  description: string;
  price: number;
}
