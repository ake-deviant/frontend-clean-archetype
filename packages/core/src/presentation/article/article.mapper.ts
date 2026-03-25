import { GetArticleResponse } from '../../application/use-cases/get-article/get-article.dto';
import {
  CartResponse,
  CartItemResponse,
} from '../../application/use-cases/add-to-cart/add-to-cart.dto';
import { ArticleViewModel } from './article.view-model';
import { CartViewModel, CartItemViewModel } from './cart.view-model';

const formatPrice = (price: number): string =>
  new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(price);

export class ArticleMapper {
  static toViewModel(response: GetArticleResponse): ArticleViewModel {
    return {
      id: response.id,
      name: response.name,
      description: response.description,
      price: response.price,
      formattedPrice: formatPrice(response.price),
    };
  }
}

export class CartMapper {
  static toViewModel(response: CartResponse): CartViewModel {
    return {
      items: response.items.map(CartMapper.toItemViewModel),
      total: response.total,
      formattedTotal: formatPrice(response.total),
      totalWithTax: response.totalWithTax,
      formattedTotalWithTax: formatPrice(response.totalWithTax),
      itemCount: response.items.reduce((sum, item) => sum + item.quantity, 0),
    };
  }

  private static toItemViewModel(item: CartItemResponse): CartItemViewModel {
    return {
      articleId: item.articleId,
      name: item.name,
      price: item.price,
      formattedPrice: formatPrice(item.price),
      quantity: item.quantity,
      subtotal: item.subtotal,
      formattedSubtotal: formatPrice(item.subtotal),
    };
  }
}
