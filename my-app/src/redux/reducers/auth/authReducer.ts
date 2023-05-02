import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authenticate } from '../../../services/authApi';
import { IncomeArgsType, InitialStateType } from './authRequestTypes';
import { AxiosError } from 'axios';

const languageLocal = localStorage.getItem('language');
const lang =
  languageLocal === 'en-US' || languageLocal === 'ru-RU'
    ? languageLocal
    : 'en-US';

const initialState: InitialStateType = {
  loading: false,
  error: null,
  isLogin: false,
  userLanguage: lang,
};

export const getToken = createAsyncThunk(
  'token/getToken',
  async (args: IncomeArgsType, thunksApi) => {
    try {
      const auth = await authenticate(args);

      return auth.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.status_message) {
        return thunksApi.rejectWithValue(error.response.data.status_message);
      }
      return thunksApi.rejectWithValue('Login error');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isLogin = false;
    },
    userLanguage: (state, action) => {
      state.userLanguage = action.payload;
    },
    login: (state) => {
      state.isLogin = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getToken.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getToken.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isLogin = true;
        localStorage.setItem('sessionId', payload?.session_id);
      })
      .addCase(getToken.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.isLogin = false;
      });
  },
});

export const authReducer = authSlice.reducer;
export const { userLanguage, login, logout } = authSlice.actions;
