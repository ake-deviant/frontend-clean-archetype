import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthViewModel, UserViewModel } from '@frontend-archetype/core';
import { container } from '../di/container';
import { DI_TOKENS } from '../di/tokens';

interface AuthState {
  currentUser: AuthViewModel | null;
  availableUsers: UserViewModel[];
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  currentUser: null,
  availableUsers: [],
  isLoading: false,
  error: null,
};

export const fetchAvailableUsers = createAsyncThunk('auth/fetchAvailableUsers', async () => {
  const useCase = container.get(DI_TOKENS.GET_ALL_USERS_USE_CASE);
  const presenter = container.get(DI_TOKENS.GET_ALL_USERS_PRESENTER);

  const result = await useCase.execute();
  if (result.isOk) return presenter.present(result.value);
  return [];
});

export const login = createAsyncThunk('auth/login', async (userId: string, { rejectWithValue }) => {
  const useCase = container.get(DI_TOKENS.LOGIN_USE_CASE);
  const presenter = container.get(DI_TOKENS.LOGIN_PRESENTER);

  const result = await useCase.execute({ userId });
  if (result.isErr) return rejectWithValue(result.error.message);
  return presenter.present(result.value);
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailableUsers.fulfilled, (state, action) => {
        state.availableUsers = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentUser = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
