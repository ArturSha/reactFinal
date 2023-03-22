import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header } from './components/header/header';
import { Login } from './components/login/login';
import { useAppSelector } from './redux/store';

function App() {
  const isLogin = useAppSelector((state) => state.authReducer.isLogin);
  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path='/login' element={!isLogin ? <Login /> : null}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
