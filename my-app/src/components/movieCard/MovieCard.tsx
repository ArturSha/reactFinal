import { Container } from '../common/Сontainer';
import { MovieCardType } from './movieCardTypes';
import { useTranslation } from '../../hooks/useTranslations';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { RateMovie } from '../common/rateMovie/RateMovie';
import { SvgStar } from '../common/svg/SvgStar';
import { SvgStarRate } from '../common/svg/SvgStarRate';
import poster from '../images/comingSoon.jpg';
import { useAppSelector } from '../../redux/store';
import {
  addToMyWatchList,
  removeFromWatchList,
} from '../../redux/reducers/account/accountReducer';
import { useAppDispatch } from '../../redux/store';
import { IncomeData } from '../../services/accountApi/watchList';
import './movieCard.scss';

export const MovieCard: React.FC<MovieCardType> = ({ props }) => {
  const { t } = useTranslation();
  const [rate, setRate] = useState<number | null | undefined>(null);
  const [isModalActive, setIsModalActive] = useState<boolean>(false);
  const [isWatched, setIsWatched] = useState<boolean | undefined>(false);
  const { isLogin } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();

  const toggleRate = () => {
    setIsModalActive(!isModalActive);

    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '16px';
  };
  useEffect(() => {
    setRate(props?.rating);
    setIsWatched(props.watchlist);
  }, []);

  const addToWatchList = (data: IncomeData) => {
    dispatch(addToMyWatchList(data));
    setIsWatched((isWatched) => !isWatched);
  };

  const delFromWatchList = (data: IncomeData) => {
    dispatch(addToMyWatchList(data));
    dispatch(removeFromWatchList(data));
    setIsWatched((isWatched) => !isWatched);
  };
  const argAdd = { id: props.id, add: true };
  const argDel = { id: props.id, add: false };

  return (
    <Container className='card-container'>
      <div>
        <Link to={`/movie/${props?.id}`}>
          <img
            className='card-container__image'
            src={
              props.poster_path
                ? `https://image.tmdb.org/t/p/w200${props?.poster_path}`
                : poster
            }
            alt='was not found'
          />
        </Link>
      </div>
      <div className='card-container-description'>
        <p>
          <span className='card-container-description__star'>
            <SvgStar fill='#c5ae17' height={'16px'} width={'16px'} />
          </span>

          {props?.vote_average.toString().slice(0, 3)}
          <button
            onClick={toggleRate}
            className='card-container-description__rate'
          >
            <SvgStarRate fill={isLogin && rate ? '#4235fd' : '#252525'} />
            <span>{isLogin && rate}</span>
          </button>
        </p>
        <RateMovie
          movieTitle={props?.title}
          setIsModalActive={setIsModalActive}
          isModalActive={isModalActive}
          id={props.id}
          setRate={setRate}
          myRate={props?.rating}
        ></RateMovie>
        <Link to={`/movie/${props?.id}`}>
          <p className='card-container-description__description'>
            {props?.title}
          </p>
        </Link>
      </div>

      <div className='card-container-watchlist'>
        <button
          onClick={() =>
            !isLogin
              ? (window.location.href = '/login')
              : !isWatched
              ? addToWatchList(argAdd)
              : delFromWatchList(argDel)
          }
          className='card-container-watchlist__button'
        >
          {isLogin && isWatched ? '- ' : '+ '}
          {t.buttons.favourite}
        </button>
      </div>
    </Container>
  );
};
