import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { apiAxiosAuth } from '../../../services/authApi';
import { InitialStateType } from './authRequestTypes';

const languageLocal = localStorage.getItem('language');

const initialState: InitialStateType = {
  loading: false,
  error: null,
  isLogin: false,
  userLanguage: languageLocal ?? 'en-EN',
};

export const getToken = createAsyncThunk(
  'token/getToken',
  async (api: string, { rejectWithValue }) => {
    try {
      const response = await apiAxiosAuth(
        `new?api_key=d72e13adb1190ab152f566a4fa9b8${api}`
      );

      localStorage.setItem('token', response.data.request_token);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    error: (state) => {
      state.isLogin = false;
    },
    userLanguage: (state, action) => {
      state.userLanguage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getToken.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getToken.fulfilled, (state) => {
        state.loading = false;
        state.isLogin = true;
      })
      .addCase(getToken.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.isLogin = false;
      });
  },
});

export const authReducer = authSlice.reducer;
export const { userLanguage } = authSlice.actions;
