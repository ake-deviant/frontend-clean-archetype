export interface CartItemQuery {
  articleId: string;
  quantity: number;
}

export interface AddToCartQuery {
  newItem: CartItemQuery;
  currentItems: CartItemQuery[];
}

export interface CartItemResponse {
  articleId: string;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
}

export interface CartResponse {
  items: CartItemResponse[];
  total: number;
  totalWithTax: number;
}
