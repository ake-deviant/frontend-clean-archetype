import { Article } from '../../domain/entities/article.entity';
import { IArticleRepository } from '../../domain/repositories/article.repository.interface';
import { IHttpClient } from '../../application/ports/http-client.port';

export class HttpArticleRepository implements IArticleRepository {
  constructor(private readonly http: IHttpClient) {}

  async findById(id: string): Promise<Article | null> {
    try {
      return await this.http.get<Article>(`/articles/${id}`);
    } catch {
      return null;
    }
  }

  async findAll(): Promise<Article[]> {
    try {
      return await this.http.get<Article[]>('/articles');
    } catch {
      return [];
    }
  }
}
