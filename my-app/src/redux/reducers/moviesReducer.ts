import { createSlice } from '@reduxjs/toolkit';
import { InitialStateType } from './moviesReducerTypes';

const initialState: InitialStateType = {
  movies: [],
  loading: false,
  error: '',
};

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const moviesReducer = moviesSlice.reducer;
