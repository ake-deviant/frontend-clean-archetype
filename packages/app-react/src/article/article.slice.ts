import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ArticleViewModel, CartViewModel, CartItemQuery } from '@frontend-archetype/core';
import { container } from '../di/container';
import { DI_TOKENS } from '../di/tokens';

interface ArticleState {
  articles: ArticleViewModel[];
  cart: CartViewModel | null;
  currentItems: CartItemQuery[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ArticleState = {
  articles: [],
  cart: null,
  currentItems: [],
  isLoading: false,
  error: null,
};

export const fetchAllArticles = createAsyncThunk('article/fetchAll', async () => {
  const useCase = container.get(DI_TOKENS.GET_ALL_ARTICLES_USE_CASE);
  const presenter = container.get(DI_TOKENS.GET_ALL_ARTICLES_PRESENTER);

  const result = await useCase.execute();
  if (result.isOk) return presenter.present(result.value);
  return [];
});

export const addToCart = createAsyncThunk(
  'article/addToCart',
  async (
    { articleId, currentItems }: { articleId: string; currentItems: CartItemQuery[] },
    { rejectWithValue },
  ) => {
    const useCase = container.get(DI_TOKENS.ADD_TO_CART_USE_CASE);
    const presenter = container.get(DI_TOKENS.ADD_TO_CART_PRESENTER);

    const result = await useCase.execute({
      newItem: { articleId, quantity: 1 },
      currentItems,
    });

    if (result.isErr) return rejectWithValue(result.error.message);
    return presenter.present(result.value);
  },
);

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllArticles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.articles = action.payload;
      })
      .addCase(fetchAllArticles.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.currentItems = action.payload.items.map((item) => ({
          articleId: item.articleId,
          quantity: item.quantity,
        }));
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default articleSlice.reducer;
