import { GetArticleUseCase } from '../../../../application/use-cases/get-article/get-article.use-case';
import { IArticleRepository } from '../../../../domain/repositories/article.repository.interface';
import { ILogger } from '../../../../application/ports/logger.port';
import { Article } from '../../../../domain/entities/article.entity';
import { ArticleNotFoundError } from '../../../../domain/errors/article-not-found.error';

const mockArticle: Article = {
  id: '1',
  name: 'Laptop Pro 15"',
  description: 'Ordinateur portable haute performance',
  price: 1299.99,
};

const mockRepository: jest.Mocked<IArticleRepository> = {
  findById: jest.fn(),
  findAll: jest.fn(),
};

const mockLogger: jest.Mocked<ILogger> = {
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

describe('GetArticleUseCase', () => {
  let useCase: GetArticleUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new GetArticleUseCase(mockRepository, mockLogger);
  });

  describe('execute', () => {
    it('should return Ok with the article when found', async () => {
      mockRepository.findById.mockResolvedValue(mockArticle);

      const result = await useCase.execute({ articleId: '1' });

      expect(result.isOk).toBe(true);
      if (result.isOk) {
        expect(result.value).toEqual({
          id: '1',
          name: 'Laptop Pro 15"',
          description: 'Ordinateur portable haute performance',
          price: 1299.99,
        });
      }
      expect(mockRepository.findById).toHaveBeenCalledWith('1');
    });

    it('should return Err with ArticleNotFoundError when article does not exist', async () => {
      mockRepository.findById.mockResolvedValue(null);

      const result = await useCase.execute({ articleId: '999' });

      expect(result.isErr).toBe(true);
      if (result.isErr) {
        expect(result.error).toBeInstanceOf(ArticleNotFoundError);
        expect(result.error.message).toBe('Article with id "999" not found');
      }
      expect(mockLogger.warn).toHaveBeenCalledTimes(1);
    });

    it('should log the articleId on each call', async () => {
      mockRepository.findById.mockResolvedValue(mockArticle);

      await useCase.execute({ articleId: '1' });

      expect(mockLogger.log).toHaveBeenCalledWith(
        '[GetArticleUseCase] Fetching article with id: 1',
      );
    });
  });
});
