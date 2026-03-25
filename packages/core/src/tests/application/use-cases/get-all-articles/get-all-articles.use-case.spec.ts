import { GetAllArticlesUseCase } from '../../../../application/use-cases/get-all-articles/get-all-articles.use-case';
import { IArticleRepository } from '../../../../domain/repositories/article.repository.interface';
import { ILogger } from '../../../../application/ports/logger.port';
import { Article } from '../../../../domain/entities/article.entity';

const mockArticles: Article[] = [
  {
    id: '1',
    name: 'Laptop Pro 15"',
    description: 'Ordinateur portable haute performance',
    price: 1299.99,
  },
  {
    id: '2',
    name: 'Souris ergonomique',
    description: 'Souris sans fil avec repose-poignet',
    price: 49.99,
  },
];

const mockRepository: jest.Mocked<IArticleRepository> = {
  findById: jest.fn(),
  findAll: jest.fn(),
};

const mockLogger: jest.Mocked<ILogger> = {
  log: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

describe('GetAllArticlesUseCase', () => {
  let useCase: GetAllArticlesUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new GetAllArticlesUseCase(mockRepository, mockLogger);
  });

  describe('execute', () => {
    it('should return Ok with all articles', async () => {
      mockRepository.findAll.mockResolvedValue(mockArticles);

      const result = await useCase.execute();

      expect(result.isOk).toBe(true);
      if (result.isOk) {
        expect(result.value).toHaveLength(2);
        expect(result.value[0]).toEqual({
          id: '1',
          name: 'Laptop Pro 15"',
          description: 'Ordinateur portable haute performance',
          price: 1299.99,
        });
      }
    });

    it('should return Ok with an empty array when no articles exist', async () => {
      mockRepository.findAll.mockResolvedValue([]);

      const result = await useCase.execute();

      expect(result.isOk).toBe(true);
      if (result.isOk) {
        expect(result.value).toHaveLength(0);
      }
    });

    it('should log the number of articles found', async () => {
      mockRepository.findAll.mockResolvedValue(mockArticles);

      await useCase.execute();

      expect(mockLogger.log).toHaveBeenCalledWith('[GetAllArticlesUseCase] Found 2 articles');
    });
  });
});
