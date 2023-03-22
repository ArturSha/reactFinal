import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppSelector } from '../../redux/store';
import './header.scss';

export const Header = () => {
  const isLogin = useAppSelector((state) => state.authReducer.isLogin);
  return (
    <header className='header'>
      <div className='header-container'>
        <NavLink
          className={({ isActive }) => (isActive ? 'active-link' : '')}
          to='/'
        >
          Movies
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? 'active-link' : '')}
          to='/favourite'
        >
          My Favourite
        </NavLink>
        {!isLogin && (
          <NavLink
            className={({ isActive }) => (isActive ? 'active-link' : '')}
            to='/login'
          >
            Login
          </NavLink>
        )}
      </div>
    </header>
  );
};
