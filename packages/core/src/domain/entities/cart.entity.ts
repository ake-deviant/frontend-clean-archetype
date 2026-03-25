import { Article } from './article.entity';

export interface CartItem {
  article: Article;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  total: number;
  totalWithTax: number;
}
