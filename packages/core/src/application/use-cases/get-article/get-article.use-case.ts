import { IArticleRepository } from '../../../domain/repositories/article.repository.interface';
import { ILogger } from '../../ports/logger.port';
import { Result, ok, err } from '../../../domain/shared/result';
import { ArticleNotFoundError } from '../../../domain/errors/article-not-found.error';
import { GetArticleQuery, GetArticleResponse } from './get-article.dto';
import { GetArticleMapper } from './get-article.mapper';

export class GetArticleUseCase {
  constructor(
    private readonly articleRepository: IArticleRepository,
    private readonly logger: ILogger,
  ) {}

  async execute(query: GetArticleQuery): Promise<Result<GetArticleResponse, ArticleNotFoundError>> {
    this.logger.log(`[GetArticleUseCase] Fetching article with id: ${query.articleId}`);

    const article = await this.articleRepository.findById(query.articleId);

    if (!article) {
      this.logger.warn(`[GetArticleUseCase] Article not found: ${query.articleId}`);
      return err(new ArticleNotFoundError(query.articleId));
    }

    this.logger.log(`[GetArticleUseCase] Article found: ${article.name}`);
    return ok(GetArticleMapper.toResponse(article));
  }
}
