import {
  GetAllArticlesResponse,
  ArticleListItem,
} from '../../application/use-cases/get-all-articles/get-all-articles.dto';
import { ArticleViewModel } from './article.view-model';

const formatPrice = (price: number): string =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);

const toViewModel = (article: ArticleListItem): ArticleViewModel => ({
  id: article.id,
  name: article.name,
  description: article.description,
  price: article.price,
  formattedPrice: formatPrice(article.price),
});

export class GetAllArticlesPresenter {
  present(response: GetAllArticlesResponse): ArticleViewModel[] {
    return response.map(toViewModel);
  }
}
