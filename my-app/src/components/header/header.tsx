import React from 'react';
import { NavLink } from 'react-router-dom';
import './header.scss';

export const Header = () => {
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
        <NavLink
          className={({ isActive }) => (isActive ? 'active-link' : '')}
          to='/login'
        >
          Login
        </NavLink>
      </div>
    </header>
  );
};
