export interface CartItemViewModel {
  articleId: string;
  name: string;
  price: number;
  formattedPrice: string;
  quantity: number;
  subtotal: number;
  formattedSubtotal: string;
}

export interface CartViewModel {
  items: CartItemViewModel[];
  total: number;
  formattedTotal: string;
  totalWithTax: number;
  formattedTotalWithTax: string;
  itemCount: number;
}
