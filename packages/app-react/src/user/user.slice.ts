import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserViewModel } from '@frontend-archetype/core';
import { getUserPresenter, getUserUseCase } from '../di/container';

interface UserState {
  user: UserViewModel | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
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
      });
  },
});

export default userSlice.reducer;
