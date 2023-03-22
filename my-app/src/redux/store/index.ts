import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { authReducer } from '../reducers/authReducer';
import { moviesReducer } from '../reducers/moviesReducer';

export const store = configureStore({
  reducer: { moviesReducer, authReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
