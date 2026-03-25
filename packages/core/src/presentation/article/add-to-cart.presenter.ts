import { CartResponse } from '../../application/use-cases/add-to-cart/add-to-cart.dto';
import { CartViewModel } from './cart.view-model';
import { CartMapper } from './article.mapper';

export class AddToCartPresenter {
  present(response: CartResponse): CartViewModel {
    return CartMapper.toViewModel(response);
  }
}
