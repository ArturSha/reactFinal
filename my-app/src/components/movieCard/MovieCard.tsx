import { Container } from '../common/Сontainer';
import { MovieCardType } from './movieCardTypes';
import pick from '../images/dark404.jpg';

import './movieCard.scss';

export const MovieCard: React.FC<MovieCardType> = ({ props }) => {
  return (
    <Container className='card-container'>
      <div>
        <img
          className='card-container__image'
          src={
            props.poster_path
              ? `https://image.tmdb.org/t/p/w200${props?.poster_path}`
              : pick
          }
          alt='was not found'
        />
      </div>
      <div className='card-container-description'>
        <p>{props?.vote_average}</p>
        <p>{props?.title}</p>
      </div>

      <div className='card-container-watchlist'>
        <button className='card-container-watchlist__button'>Watchlist</button>
      </div>
    </Container>
  );
};
