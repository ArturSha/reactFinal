import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiAxios } from '../../../services';
import { IncomingData, InitialStateType, Root } from './movieListReducerTypes';

const initialState: InitialStateType = {
  movieList: [],
  loading: false,
  error: null,
};

export const getUpcomingMovies = createAsyncThunk<
  Root,
  IncomingData,
  { rejectValue: string }
>('movies/upcoming', async (data, { rejectWithValue }) => {
  try {
    const response = await apiAxios({
      url: 'movie/upcoming',
      params: {
        page: data.page,
        language: data.language,
      },
    });

    return response.data;
  } catch (e: any) {
    return rejectWithValue(e.message);
  }
});

const movieListSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUpcomingMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUpcomingMovies.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(getUpcomingMovies.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.movieList = payload.results;
      });
  },
});

export const movieListReducer = movieListSlice.reducer;
