import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { InitialStateType, Root } from './searchReducerTypes';
import { searchMovies } from '../../../services/searchApi/search';
import { AxiosError } from 'axios';

const initialState: InitialStateType = {
  searchList: [],
  isLoading: false,
  error: null,
};

export const getSearchingMovies = createAsyncThunk<
  Root,
  string,
  { rejectValue: string }
>('search/movies', async (data, thunksApi) => {
  try {
    const response = searchMovies(data);
    return response;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data?.status_message) {
      return thunksApi.rejectWithValue(error.response.data.status_message);
    }
    return thunksApi.rejectWithValue('Server error');
  }
});

const searchListSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSearchingMovies.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getSearchingMovies.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
      })
      .addCase(getSearchingMovies.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.searchList = payload.results;
      });
  },
});
export const searchListReducer = searchListSlice.reducer;
