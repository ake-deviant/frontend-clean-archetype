import { Article } from '../../../domain/entities/article.entity';
import { GetArticleResponse } from './get-article.dto';

export class GetArticleMapper {
  static toResponse(article: Article): GetArticleResponse {
    return {
      id: article.id,
      name: article.name,
      description: article.description,
      price: article.price,
    };
  }
}
