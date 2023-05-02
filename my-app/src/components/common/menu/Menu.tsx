import { NavLink, useLocation } from 'react-router-dom';
import './menu.scss';
import { useTranslation } from '../../../hooks/useTranslations';
import { useAppSelector } from '../../../redux/store';

interface MenuType {
  className: string;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  logOutFromApp: () => void;
}

export const Menu: React.FC<MenuType> = (props) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const isLogin = useAppSelector((state) => state.authReducer.isLogin);
  const { setIsMenuOpen, logOutFromApp } = props;
  const toggleClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className={`container-menu ${props.className}`} onClick={toggleClose}>
      <ul>
        <NavLink
          className={({ isActive }) =>
            isActive || pathname.startsWith('/upComing')
              ? 'menu-active-link'
              : 'menu-link'
          }
          to={`upComing/1`}
        >
          <li>{t.header.links.movies}</li>
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive || pathname.startsWith('/watchlist')
              ? 'menu-active-link'
              : 'menu-link'
          }
          to='/watchlist/1'
        >
          <li>{t.header.links.watchlist}</li>
        </NavLink>
        {!isLogin && (
          <NavLink
            className={({ isActive }) =>
              isActive ? 'menu-active-link' : 'menu-link'
            }
            to='/login'
          >
            <li>{t.header.links.login}</li>
          </NavLink>
        )}
        {isLogin && (
          <NavLink
            to={''}
            onClick={logOutFromApp}
            className={({ isActive }) =>
              isActive ? 'menu-active-link' : 'menu-link'
            }
          >
            <li>{t.header.links.logout}</li>
          </NavLink>
        )}
      </ul>
    </div>
  );
};
