import { searchListReducer } from './../reducers/search/searchReducer';
import { accountReducer } from './../reducers/account/accountReducer';
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { authReducer } from '../reducers/auth/authReducer';
import { movieListReducer } from '../reducers/movieList/movieListReducer';
import { movieReducer } from '../reducers/movieItem/movieItemReducer';

export const store = configureStore({
  reducer: {
    movieListReducer,
    authReducer,
    movieReducer,
    accountReducer,
    searchListReducer,
  },
});

export type AppDispatchType = typeof store.dispatch;
export const useAppDispatch: () => AppDispatchType = useDispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
