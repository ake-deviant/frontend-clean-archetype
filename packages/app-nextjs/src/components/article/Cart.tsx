'use client';

import { useState } from 'react';
import { ArticleViewModel, CartViewModel, CartItemQuery } from '@frontend-archetype/core';

interface CartProps {
  articles: ArticleViewModel[];
}

export function Cart({ articles }: CartProps) {
  const [cart, setCart] = useState<CartViewModel | null>(null);
  const [currentItems, setCurrentItems] = useState<CartItemQuery[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleAddToCart = async (articleId: string) => {
    const response = await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ articleId, currentItems }),
    });

    if (!response.ok) {
      const data = await response.json();
      setError(data.error);
      return;
    }

    const cartViewModel: CartViewModel = await response.json();
    setCart(cartViewModel);
    setCurrentItems(
      cartViewModel.items.map((item) => ({ articleId: item.articleId, quantity: item.quantity })),
    );
  };

  return (
    <>
      <section className="articles">
        <h2>Articles</h2>
        <ul>
          {articles.map((article) => (
            <li key={article.id}>
              <strong>{article.name}</strong>
              <span>{article.formattedPrice}</span>
              <p>{article.description}</p>
              <button onClick={() => handleAddToCart(article.id)}>Ajouter au panier</button>
            </li>
          ))}
        </ul>
      </section>

      {error && <p className="error">{error}</p>}

      {cart && (
        <section className="cart">
          <h2>Panier ({cart.itemCount} article(s))</h2>
          <ul>
            {cart.items.map((item) => (
              <li key={item.articleId}>
                {item.name} × {item.quantity} — {item.formattedSubtotal}
              </li>
            ))}
          </ul>
          <p>Total HT : {cart.formattedTotal}</p>
          <p>
            <strong>Total TTC : {cart.formattedTotalWithTax}</strong>
          </p>
        </section>
      )}
    </>
  );
}
