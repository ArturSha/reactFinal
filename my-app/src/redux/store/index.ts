import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { authReducer } from '../reducers/auth/authReducer';
import { movieListReducer } from '../reducers/movieList/movieListReducer';

export const store = configureStore({
  reducer: { movieListReducer, authReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
