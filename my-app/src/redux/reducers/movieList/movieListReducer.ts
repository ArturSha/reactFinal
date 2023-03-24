import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiAxios } from '../../../components/service';
import { InitialStateType } from './movieListReducerTypes';

const initialState: InitialStateType = {
  movies: [],
  loading: false,
  error: null,
};

export const getUpcomingMovies = createAsyncThunk(
  'movies/upcoming',
  async (data: any, { rejectWithValue }) => {
    try {
      const response = await apiAxios('movie/upcoming');
      console.log(response);
    } catch (error) {}
  }
);

const movieListSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const movieListReducer = movieListSlice.reducer;
