import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { apiAxios } from '../../components/service';
import { InitialStateType } from './authRequestTypes';

const initialState: InitialStateType = {
  loading: false,
  error: '',
  isLogin: false,
};

export const getToken = createAsyncThunk(
  'token/getToken',
  async function (api: string, { rejectWithValue }) {
    try {
      const response = await apiAxios.get(
        `authentication/token/new?api_key=d72e13adb1190ab152f566a4fa9b8${api}`
      );

      localStorage.setItem('token', response.data.request_token);

      return response.data;
    } catch (e: any) {
      return e;
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(getToken.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getToken.fulfilled, (state, payload) => {
        state.loading = false;
        payload.payload.message
          ? (state.error = payload.payload.message)
          : (state.error = '');
        payload.payload.success === true
          ? (state.isLogin = true)
          : (state.isLogin = false);
        console.log(
          'Артём, почему ответ 401 воспринимается как fulfilled, а не rejected ? P.S password is 135 '
        );
      })
      .addCase(getToken.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isLogin = false;
      });
  },
});

export const authReducer = authSlice.reducer;
