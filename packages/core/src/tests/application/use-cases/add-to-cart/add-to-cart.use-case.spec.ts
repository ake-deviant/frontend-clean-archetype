import { AddToCartUseCase } from '../../../../application/use-cases/add-to-cart/add-to-cart.use-case';
import { IArticleRepository } from '../../../../domain/repositories/article.repository.interface';
import { ILogger } from '../../../../application/ports/logger.port';
import { Article } from '../../../../domain/entities/article.entity';
import { ArticleNotFoundError } from '../../../../domain/errors/article-not-found.error';

const laptop: Article = {
  id: '1',
  name: 'Laptop Pro 15"',
  description: 'Ordinateur portable haute performance',
  price: 1299.99,
};

const mouse: Article = {
  id: '2',
  name: 'Souris ergonomique',
  description: 'Souris sans fil avec repose-poignet',
  price: 49.99,
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

describe('AddToCartUseCase', () => {
  let useCase: AddToCartUseCase;

  beforeEach(() => {
    jest.clearAllMocks();
    useCase = new AddToCartUseCase(mockRepository, mockLogger);
  });

  describe('execute', () => {
    it('should return a cart with one item when cart was empty', async () => {
      mockRepository.findById.mockResolvedValue(laptop);

      const result = await useCase.execute({
        newItem: { articleId: '1', quantity: 1 },
        currentItems: [],
      });

      expect(result.isOk).toBe(true);
      if (result.isOk) {
        expect(result.value.items).toHaveLength(1);
        expect(result.value.items[0].articleId).toBe('1');
        expect(result.value.items[0].quantity).toBe(1);
        expect(result.value.items[0].subtotal).toBe(1299.99);
        expect(result.value.total).toBe(1299.99);
        expect(result.value.totalWithTax).toBe(1559.99);
      }
    });

    it('should merge quantity when adding the same article twice', async () => {
      mockRepository.findById.mockResolvedValue(laptop);

      const result = await useCase.execute({
        newItem: { articleId: '1', quantity: 1 },
        currentItems: [{ articleId: '1', quantity: 2 }],
      });

      expect(result.isOk).toBe(true);
      if (result.isOk) {
        expect(result.value.items).toHaveLength(1);
        expect(result.value.items[0].quantity).toBe(3);
        expect(result.value.total).toBe(1299.99 * 3);
      }
    });

    it('should return a cart with multiple items', async () => {
      mockRepository.findById.mockImplementation((id: string) => {
        if (id === '1') return Promise.resolve(laptop);
        if (id === '2') return Promise.resolve(mouse);
        return Promise.resolve(null);
      });

      const result = await useCase.execute({
        newItem: { articleId: '2', quantity: 1 },
        currentItems: [{ articleId: '1', quantity: 1 }],
      });

      expect(result.isOk).toBe(true);
      if (result.isOk) {
        expect(result.value.items).toHaveLength(2);
        expect(result.value.total).toBe(1299.99 + 49.99);
      }
    });

    it('should return Err with ArticleNotFoundError when article does not exist', async () => {
      mockRepository.findById.mockResolvedValue(null);

      const result = await useCase.execute({
        newItem: { articleId: '999', quantity: 1 },
        currentItems: [],
      });

      expect(result.isErr).toBe(true);
      if (result.isErr) {
        expect(result.error).toBeInstanceOf(ArticleNotFoundError);
        expect(result.error.message).toBe('Article with id "999" not found');
      }
    });

    it('should compute totalWithTax with 20% TVA', async () => {
      mockRepository.findById.mockResolvedValue(mouse);

      const result = await useCase.execute({
        newItem: { articleId: '2', quantity: 2 },
        currentItems: [],
      });

      expect(result.isOk).toBe(true);
      if (result.isOk) {
        expect(result.value.total).toBe(99.98);
        expect(result.value.totalWithTax).toBe(119.98);
      }
    });
  });
});
