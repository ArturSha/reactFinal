import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { InitialStateType, Root, VideoRoot } from './movieItemReducerTypes';
import {
  GetMovieItemType,
  getMovieItem,
} from '../../../services/moviesApi/movieItem';
import { getMovieVideo } from '../../../services/moviesApi/movieVideo';
import { AxiosError } from 'axios';

const initialState: InitialStateType = {
  movie: null,
  loading: false,
  error: null,
  video: null,
};

export const getMovieById = createAsyncThunk<
  Root,
  GetMovieItemType,
  { rejectValue: string }
>('movie/getById', async (data, thunksApi) => {
  try {
    const response = await getMovieItem(data);

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data?.status_message) {
      return thunksApi.rejectWithValue(error.response.data.status_message);
    }
    return thunksApi.rejectWithValue('Server error');
  }
});

export const getVideoById = createAsyncThunk<
  VideoRoot,
  GetMovieItemType,
  { rejectValue: string }
>('movie/getVideoById', async (data, thunksApi) => {
  try {
    const response = await getMovieVideo(data);

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data?.status_message) {
      return thunksApi.rejectWithValue(error.response.data.status_message);
    }
    return thunksApi.rejectWithValue('Server error');
  }
});

const movieByIdSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMovieById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMovieById.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(getMovieById.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.movie = payload;
      })
      .addCase(getVideoById.pending, (state) => {
        state.error = null;
      })
      .addCase(getVideoById.rejected, (state, { payload }) => {
        state.error = payload;
      })
      .addCase(getVideoById.fulfilled, (state, { payload }) => {
        state.video = payload.results?.[0]?.key;
      });
  },
});

export const movieReducer = movieByIdSlice.reducer;
