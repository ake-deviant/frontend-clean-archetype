import { Article } from '../entities/article.entity';

export interface IArticleRepository {
  findById(id: string): Promise<Article | null>;
  findAll(): Promise<Article[]>;
}
