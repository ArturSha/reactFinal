import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Header } from './components/header/Header';
import { LoginForm } from './components/pages/login/LoginForm';
import { UpcomingMovieList } from './components/pages/upComingMovieList/UpcomingMovieList';
import { useAppSelector } from './redux/store';
import { MovieItem } from './components/pages/movieItem/MovieItem';

function App() {
  const isLogin = useAppSelector((state) => state.authReducer.isLogin);

  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route
            path='/'
            element={<Navigate to={'/upComing/1'}></Navigate>}
          ></Route>
          <Route path='/upComing/:p' element={<UpcomingMovieList />}></Route>
          <Route
            path='/login'
            element={
              !isLogin ? (
                <LoginForm />
              ) : (
                <Navigate to={'/upComing/1'} replace></Navigate>
              )
            }
          ></Route>
          <Route path='movie/:id' element={<MovieItem />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
