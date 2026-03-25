import { IArticleRepository } from '../../../domain/repositories/article.repository.interface';
import { ILogger } from '../../ports/logger.port';
import { Result, ok, err } from '../../../domain/shared/result';
import { ArticleNotFoundError } from '../../../domain/errors/article-not-found.error';
import { AddToCartQuery, CartResponse } from './add-to-cart.dto';
import { AddToCartMapper } from './add-to-cart.mapper';
import { Cart, CartItem } from '../../../domain/entities/cart.entity';

const TAX_RATE = 0.2;

export class AddToCartUseCase {
  constructor(
    private readonly articleRepository: IArticleRepository,
    private readonly logger: ILogger,
  ) {}

  async execute(query: AddToCartQuery): Promise<Result<CartResponse, ArticleNotFoundError>> {
    this.logger.log(`[AddToCartUseCase] Adding article ${query.newItem.articleId} to cart`);

    const allItemQueries = [...query.currentItems, query.newItem];
    const cartItems: CartItem[] = [];

    for (const itemQuery of allItemQueries) {
      const article = await this.articleRepository.findById(itemQuery.articleId);

      if (!article) {
        this.logger.warn(`[AddToCartUseCase] Article not found: ${itemQuery.articleId}`);
        return err(new ArticleNotFoundError(itemQuery.articleId));
      }

      const existing = cartItems.find((i) => i.article.id === article.id);

      if (existing) {
        existing.quantity += itemQuery.quantity;
      } else {
        cartItems.push({ article, quantity: itemQuery.quantity });
      }
    }

    const total = cartItems.reduce((sum, item) => sum + item.article.price * item.quantity, 0);
    const totalWithTax = Math.round(total * (1 + TAX_RATE) * 100) / 100;

    const cart: Cart = { items: cartItems, total, totalWithTax };

    this.logger.log(
      `[AddToCartUseCase] Cart updated with ${cartItems.length} item(s), total: ${total}`,
    );

    return ok(AddToCartMapper.toResponse(cart));
  }
}
