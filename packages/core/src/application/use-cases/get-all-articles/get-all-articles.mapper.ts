import { Article } from '../../../domain/entities/article.entity';
import { ArticleListItem, GetAllArticlesResponse } from './get-all-articles.dto';

export class GetAllArticlesMapper {
  static toResponse(articles: Article[]): GetAllArticlesResponse {
    return articles.map(GetAllArticlesMapper.toItem);
  }

  private static toItem(article: Article): ArticleListItem {
    return {
      id: article.id,
      name: article.name,
      description: article.description,
      price: article.price,
    };
  }
}
