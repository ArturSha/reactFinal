import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  InitialStateTypes,
  Root,
  WatchListResponseType,
} from './accountReducerTypes';
import { getRatedMovies } from '../../../services/accountApi';
import {
  IncomeData,
  WatchListParams,
  addToWatchlist,
  getWatchList,
} from '../../../services/accountApi/watchList';
import { AxiosError } from 'axios';

const initialState: InitialStateTypes = {
  ratedMovies: [],
  watchList: [],
  loading: false,
  error: null,
};

export const ratedMovies = createAsyncThunk<
  Root,
  void,
  { rejectValue: string }
>('account/rated', async (_, thunksApi) => {
  try {
    const response = await getRatedMovies();

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data?.status_message) {
      return thunksApi.rejectWithValue(error.response.data.status_message);
    }
    return thunksApi.rejectWithValue('Server error');
  }
});

export const myWatchList = createAsyncThunk<
  Root,
  WatchListParams,
  { rejectValue: string }
>('account/watchList', async (data, thunksApi) => {
  try {
    const response = await getWatchList(data);

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data?.status_message) {
      return thunksApi.rejectWithValue(error.response.data.status_message);
    }
    return thunksApi.rejectWithValue('Watchlist error');
  }
});

export const addToMyWatchList = createAsyncThunk<
  WatchListResponseType,
  IncomeData,
  { rejectValue: string }
>('account/addToWatchlist', async (data, thunksApi) => {
  try {
    const response = await addToWatchlist(data);

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.data?.status_message) {
      return thunksApi.rejectWithValue(error.response.data.status_message);
    }
    return thunksApi.rejectWithValue('Server error');
  }
});

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    removeFromWatchList: (state, action) => {
      state.watchList = state.watchList.filter(
        (item) => item.id !== action.payload.id
      );
    },
    changeRate: (state, action) => {
      const { id, newValue } = action.payload;
      const index = state.ratedMovies.findIndex((movie) => movie.id === id);
      if (index !== -1) {
        state.ratedMovies[index].rating = newValue;
      }
    },
  },
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
      })
      .addCase(myWatchList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(myWatchList.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.watchList = payload.results;
      })
      .addCase(myWatchList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addToMyWatchList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToMyWatchList.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(addToMyWatchList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { removeFromWatchList, changeRate } = accountSlice.actions;
export const accountReducer = accountSlice.reducer;
