import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authenticate } from '../../../services/authApi';
import { IncomeArgsType, InitialStateType } from './authRequestTypes';

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
  async (args: IncomeArgsType, { rejectWithValue }) => {
    try {
      const auth = await authenticate(args);

      return auth.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.status_message);
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
export const { userLanguage } = authSlice.actions;
