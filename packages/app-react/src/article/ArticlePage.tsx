import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchAllArticles, addToCart } from './article.slice';

export function ArticlePage() {
  const dispatch = useAppDispatch();
  const { articles, cart, currentItems, isLoading, error } = useAppSelector(
    (state) => state.article,
  );

  useEffect(() => {
    dispatch(fetchAllArticles());
  }, [dispatch]);

  if (isLoading) return <p>Chargement des articles...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <>
      <section className="articles">
        <h2>Articles</h2>
        <ul>
          {articles.map((article) => (
            <li key={article.id}>
              <strong>{article.name}</strong>
              <span>{article.formattedPrice}</span>
              <button onClick={() => dispatch(addToCart({ articleId: article.id, currentItems }))}>
                Ajouter au panier
              </button>
            </li>
          ))}
        </ul>
      </section>

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
