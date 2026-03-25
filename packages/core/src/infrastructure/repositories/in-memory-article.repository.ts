import { Article } from '../../domain/entities/article.entity';
import { IArticleRepository } from '../../domain/repositories/article.repository.interface';

const SEED_ARTICLES: Article[] = [
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
  {
    id: '3',
    name: 'Clavier mécanique',
    description: 'Clavier rétroéclairé switches Cherry MX',
    price: 129.99,
  },
];

export class InMemoryArticleRepository implements IArticleRepository {
  private readonly articles: Article[];

  constructor(initialData: Article[] = SEED_ARTICLES) {
    this.articles = [...initialData];
  }

  async findById(id: string): Promise<Article | null> {
    return this.articles.find((a) => a.id === id) ?? null;
  }

  async findAll(): Promise<Article[]> {
    return [...this.articles];
  }
}
