import { Container } from '../common/Сontainer';
import { MovieCardType } from './movieCardTypes';
import poster from '../images/dark404.jpg';

import './movieCard.scss';
import { useTranslation } from '../../hooks/useTranslations';
import { Link } from 'react-router-dom';

export const MovieCard: React.FC<MovieCardType> = ({ props }) => {
  const { t } = useTranslation();
  return (
    <Container className='card-container'>
      <div>
        <img
          className='card-container__image'
          src={
            props.poster_path
              ? `https://image.tmdb.org/t/p/w200${props?.poster_path}`
              : poster
          }
          alt='was not found'
        />
      </div>
      <div className='card-container-description'>
        <p>{props?.vote_average}</p>
        <Link to={`/movie/${props?.id}`}>
          <p>{props?.title}</p>
        </Link>
      </div>

      <div className='card-container-watchlist'>
        <button className='card-container-watchlist__button'>
          + {t.buttons.favourite}
        </button>
      </div>
    </Container>
  );
};
