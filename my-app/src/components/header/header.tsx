import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { userLanguage } from '../../redux/reducers/auth/authReducer';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { Container } from '../common/Сontainer';
import { useTranslation } from '../../hooks/useTranslations';
import './header.scss';


export const Header = () => {
  const {t} = useTranslation()
  const isLogin = useAppSelector((state) => state.authReducer.isLogin);
  const dispatch = useAppDispatch();
  const userLanguageLocal = localStorage.getItem('language');
  const [language, setLanguage] = useState<string>(
    userLanguageLocal ? userLanguageLocal : 'en-EN'
  );

  localStorage.setItem('language', language);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
    dispatch(userLanguage(language === 'en-EN' ? 'ru-RU' : 'en-EN'));
  };

  return (
    <header className='header'>
      <Container className='header-container'>
        <NavLink
          className={({ isActive }) => (isActive ? 'active-link' : 'link')}
          to='/'
        >
          {t.header.links.movies}
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? 'active-link' : 'link')}
          to='/favourite'
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
        <Container className='header-container__select'>
          <select
            tabIndex={0}
            name='language'
            value={language}
            onChange={handleChange}
          >
            <option value='en-EN'>EN</option>
            <option value='ru-RU'>РУ</option>
          </select>
        </Container>
      </Container>
    </header>
  );
};
