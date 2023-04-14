import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { InitialStateTypes, Root } from './accountReducerTypes';
import { getRatedMovies } from '../../../services/accountApi';

const initialState: InitialStateTypes = {
  ratedMovies: [],
  loading: false,
  error: null,
};

export const ratedMovies = createAsyncThunk<
  Root,
  void,
  { rejectValue: string }
>('account/rated', async (_, { rejectWithValue }) => {
  try {
    const response = await getRatedMovies();

    return response.data;
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(ratedMovies.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(ratedMovies.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.ratedMovies = payload.results;
      })
      .addCase(ratedMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const accountReducer = accountSlice.reducer;
