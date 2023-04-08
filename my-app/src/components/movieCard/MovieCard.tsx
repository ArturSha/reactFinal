import { Container } from '../common/Сontainer';
import { MovieCardType } from './movieCardTypes';
import { useTranslation } from '../../hooks/useTranslations';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { RateMovie } from '../common/rateMovie/RateMovie';
import { SvgStar } from '../common/svg/SvgStar';
import { SvgStarRate } from '../common/svg/SvgStarRate';
import poster from '../images/dark404.jpg';
import './movieCard.scss';

export const MovieCard: React.FC<MovieCardType> = ({ props }) => {
  const { t } = useTranslation();
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const toggleRate = () => {
    setIsModalActive(!isModalActive);
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '16px';
  };
  return (
    <Container className='card-container'>
      <RateMovie
        movieTitle={props?.title}
        setIsModalActive={setIsModalActive}
        isModalActive={isModalActive}
      />

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
        <p>
          <span className='card-container-description__star'>
            <SvgStar fill='#c5ae17' height={'16px'} width={'16px'} />
          </span>

          {props?.vote_average}
          <button
            onClick={toggleRate}
            className='card-container-description__rate'
          >
            <SvgStarRate />
          </button>
        </p>
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
