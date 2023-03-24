import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Header } from './components/header/Header';
import { LoginForm } from './components/login/LoginForm';
import { useAppSelector } from './redux/store';

function App() {
  const isLogin = useAppSelector((state) => state.authReducer.isLogin);
  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route
            path='/login'
            element={
              !isLogin ? <LoginForm /> : <Navigate to={'/'} replace></Navigate>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
