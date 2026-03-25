import { Provider } from 'react-redux';
import { store } from './store/store';
import { AuthBar } from './auth/AuthBar';
import { ArticlePage } from './article/ArticlePage';

export default function App() {
  return (
    <Provider store={store}>
      <header>
        <h1>Frontend Archetype — React</h1>
        <AuthBar />
      </header>
      <main>
        <ArticlePage />
      </main>
    </Provider>
  );
}
