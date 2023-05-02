import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Header } from './components/header/Header';
import { LoginForm } from './components/pages/login/LoginForm';
import { UpcomingMovieList } from './components/pages/upComingMovieList/UpcomingMovieList';
import { useAppDispatch, useAppSelector } from './redux/store';
import { MovieItem } from './components/pages/movieItem/MovieItem';
import { WatchList } from './components/pages/watchList/WatchList';
import { useEffect } from 'react';
import { login } from './redux/reducers/auth/authReducer';

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const accessToken = localStorage.getItem('sessionId');
    const tokenExpiration = localStorage.getItem('expires');
    if (accessToken && tokenExpiration) {
      const expirationTime = parseInt(tokenExpiration, 10);
      const currentTime = new Date().getTime();

      if (expirationTime > currentTime) {
        dispatch(login());
      }
    }
  }, []);
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
            path='/watchlist/:p'
            element={isLogin ? <WatchList /> : <Navigate to={'/login'} />}
          ></Route>

          <Route
            path='/login'
            element={
              !isLogin ? <LoginForm /> : <Navigate to={'/upComing/1'} replace />
            }
          ></Route>
          <Route path='movie/:id' element={<MovieItem />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
