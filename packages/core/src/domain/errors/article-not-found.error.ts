import { DomainError } from './domain.error';

export class ArticleNotFoundError extends DomainError {
  constructor(articleId: string) {
    super(`Article with id "${articleId}" not found`);
  }
}
