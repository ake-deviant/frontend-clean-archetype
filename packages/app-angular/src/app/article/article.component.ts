import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { ArticleViewModel, CartViewModel, CartItemQuery } from '@frontend-archetype/core';
import {
  GET_ALL_ARTICLES_USE_CASE,
  GET_ALL_ARTICLES_PRESENTER,
  ADD_TO_CART_USE_CASE,
  ADD_TO_CART_PRESENTER,
} from '../di/app.providers';

@Component({
  selector: 'app-article',
  standalone: true,
  templateUrl: './article.component.html',
})
export class ArticleComponent implements OnInit {
  private readonly getAllArticlesUseCase = inject(GET_ALL_ARTICLES_USE_CASE);
  private readonly getAllArticlesPresenter = inject(GET_ALL_ARTICLES_PRESENTER);
  private readonly addToCartUseCase = inject(ADD_TO_CART_USE_CASE);
  private readonly addToCartPresenter = inject(ADD_TO_CART_PRESENTER);

  readonly articles = signal<ArticleViewModel[]>([]);
  readonly cart = signal<CartViewModel | null>(null);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);

  readonly cartItemCount = computed(() => this.cart()?.itemCount ?? 0);
  readonly cartTotal = computed(() => this.cart()?.formattedTotalWithTax ?? '0,00 €');

  private currentItems: CartItemQuery[] = [];

  ngOnInit(): void {
    this.loadArticles();
  }

  async loadArticles(): Promise<void> {
    this.isLoading.set(true);
    this.error.set(null);

    try {
      const result = await this.getAllArticlesUseCase.execute();

      if (result.isErr) {
        this.error.set(result.error.message);
        return;
      }

      this.articles.set(this.getAllArticlesPresenter.present(result.value));
    } catch {
      this.error.set('An unexpected error occurred.');
    } finally {
      this.isLoading.set(false);
    }
  }

  async addToCart(articleId: string): Promise<void> {
    const result = await this.addToCartUseCase.execute({
      newItem: { articleId, quantity: 1 },
      currentItems: this.currentItems,
    });

    if (result.isErr) {
      this.error.set(result.error.message);
      return;
    }

    this.cart.set(this.addToCartPresenter.present(result.value));
    this.currentItems = result.value.items.map((item) => ({
      articleId: item.articleId,
      quantity: item.quantity,
    }));
  }
}
