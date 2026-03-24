import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserViewModel } from '@frontend-archetype/core';
import {
  getAllUsersPresenter,
  getAllUsersUseCase,
  getUserPresenter,
  getUserUseCase,
} from '../di/container';

interface UserState {
  user: UserViewModel | null;
  users: UserViewModel[];
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  users: [],
  isLoading: false,
  error: null,
};

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (userId: string, { rejectWithValue }) => {
    const result = await getUserUseCase.execute({ userId });
    if (result.isErr) return rejectWithValue(result.error.message);
    return getUserPresenter.present(result.value);
  },
);

export const fetchAllUsers = createAsyncThunk('user/fetchAllUsers', async () => {
  const result = await getAllUsersUseCase.execute();
  if (result.isOk) return getAllUsersPresenter.present(result.value);
  return [];
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      });
  },
});

export default userSlice.reducer;
