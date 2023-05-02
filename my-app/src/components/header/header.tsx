import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { logout, userLanguage } from '../../redux/reducers/auth/authReducer';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { Container } from '../common/container/Сontainer';
import { useTranslation } from '../../hooks/useTranslations';
import { Search } from '../search/Search';
import { Menu } from '../common/menu/Menu';
import './header.scss';

export const Header = () => {
  const { t } = useTranslation();

  const isLogin = useAppSelector((state) => state.authReducer.isLogin);

  const dispatch = useAppDispatch();

  const userLanguageLocal = localStorage.getItem('language');

  const [language, setLanguage] = useState<string>(
    userLanguageLocal === 'ru-RU' ? userLanguageLocal : 'en-US'
  );

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  localStorage.setItem('language', language);

  const { pathname } = useLocation();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
    dispatch(userLanguage(language === 'en-US' ? 'ru-RU' : 'en-US'));
  };
  const logOutFromApp = () => {
    dispatch(logout());
    localStorage.removeItem('expires');
    localStorage.removeItem('sessionId');
  };

  return (
    <header className='header'>
      <button
        className={`header-menu__button ${isMenuOpen ? 'open' : ''}`}
        onClick={toggleMenu}
      >
        <span />
      </button>
      <Menu
        className={isMenuOpen ? 'active' : ''}
        setIsMenuOpen={setIsMenuOpen}
        logOutFromApp={logOutFromApp}
      />

      <Container className='header-container'>
        <NavLink
          className={({ isActive }) =>
            isActive || pathname.startsWith('/upComing')
              ? 'active-link'
              : 'link'
          }
          to={`upComing/1`}
        >
          {t.header.links.movies}
        </NavLink>
        <Search />
        <NavLink
          className={({ isActive }) =>
            isActive || pathname.startsWith('/watchlist')
              ? 'active-link'
              : 'link'
          }
          to='/watchlist/1'
        >
          {t.header.links.watchlist}
        </NavLink>
        {!isLogin && (
          <NavLink
            className={({ isActive }) => (isActive ? 'active-link' : 'link')}
            to='/login'
          >
            {t.header.links.login}
          </NavLink>
        )}

        {isLogin && (
          <NavLink
            to={''}
            onClick={logOutFromApp}
            className={({ isActive }) => (isActive ? 'active-link' : 'link')}
          >
            {t.header.links.logout}
          </NavLink>
        )}

        <Container className='header-container__select'>
          <select
            tabIndex={0}
            name='language'
            value={language}
            onChange={handleChange}
          >
            <option value='en-US'>EN</option>
            <option value='ru-RU'>РУ</option>
          </select>
        </Container>
      </Container>
    </header>
  );
};
