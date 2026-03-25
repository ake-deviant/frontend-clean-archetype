import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../user/user.slice';
import articleReducer from '../article/article.slice';
import authReducer from '../auth/auth.slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    article: articleReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
