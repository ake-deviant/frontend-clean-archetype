import { IArticleRepository } from '../../../domain/repositories/article.repository.interface';
import { ILogger } from '../../ports/logger.port';
import { Result, ok } from '../../../domain/shared/result';
import { GetAllArticlesResponse } from './get-all-articles.dto';
import { GetAllArticlesMapper } from './get-all-articles.mapper';

export class GetAllArticlesUseCase {
  constructor(
    private readonly articleRepository: IArticleRepository,
    private readonly logger: ILogger,
  ) {}

  async execute(): Promise<Result<GetAllArticlesResponse>> {
    this.logger.log('[GetAllArticlesUseCase] Fetching all articles');
    const articles = await this.articleRepository.findAll();
    this.logger.log(`[GetAllArticlesUseCase] Found ${articles.length} articles`);
    return ok(GetAllArticlesMapper.toResponse(articles));
  }
}
