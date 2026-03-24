import { Provider } from 'react-redux';
import { store } from './store/store';
import { UserPage } from './user/UserPage';

export default function App() {
  return (
    <Provider store={store}>
      <h1>Frontend Archetype — React</h1>
      <UserPage />
    </Provider>
  );
}
