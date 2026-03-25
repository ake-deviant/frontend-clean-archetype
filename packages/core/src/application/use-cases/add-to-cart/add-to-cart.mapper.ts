import { Cart } from '../../../domain/entities/cart.entity';
import { CartResponse } from './add-to-cart.dto';

const TAX_RATE = 0.2;

export class AddToCartMapper {
  static toResponse(cart: Cart): CartResponse {
    return {
      items: cart.items.map((item) => ({
        articleId: item.article.id,
        name: item.article.name,
        price: item.article.price,
        quantity: item.quantity,
        subtotal: item.article.price * item.quantity,
      })),
      total: cart.total,
      totalWithTax: Math.round(cart.total * (1 + TAX_RATE) * 100) / 100,
    };
  }
}
