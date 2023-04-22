import { Rating } from '@mui/material';
import { useTranslation } from '../../../hooks/useTranslations';
import './rateMovie.scss';
import { useState } from 'react';
import { SvgStar } from '../svg/SvgStar';
import { starSize } from './setStarSize';
import { rateMovie } from '../../../services/moviesApi/rateMovie';
import { useAppSelector } from '../../../redux/store';
import { deleteRating } from '../../../services/moviesApi/deleteRating';

interface RatemovieType {
  isModalActive: boolean;
  setIsModalActive: (arg: boolean) => void;
  movieTitle: string;
  id: number;
  setRate: (arg: number | null | undefined) => void;

  myRate: number | undefined | null;
}

export const RateMovie = ({
  isModalActive,
  setIsModalActive,
  movieTitle,
  id,
  setRate,
  myRate,
}: RatemovieType) => {
  const [value, setValue] = useState<number | null>(null);
  const [isRated, setIsRated] = useState<boolean>(false);

  const handleChange = (
    _event: React.ChangeEvent<{}>,
    newValue: number | null
  ) => {
    setValue(newValue);
  };

  const { isLogin } = useAppSelector((state) => state.authReducer);

  const { t } = useTranslation();

  const hideModal = () => {
    setIsModalActive(!isModalActive);
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  };

  const closeModal = () => {
    hideModal();
    if (!myRate && !value) setRate(myRate);
  };
  const rateAndClose = (newValue: number | null) => {
    rateMovie({ value, id });
    setIsRated(true);
    setRate(newValue);
    setValue(newValue);
    hideModal();
  };

  const delRating = () => {
    deleteRating(id);
    setIsRated(false);
    setValue(null);
    setRate(null);
    hideModal();
  };

  return (
    <div
      onClick={closeModal}
      className={` ${
        isModalActive ? 'container-rate active' : 'container-rate'
      }`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='container-rate-inner'
      >
        <div className='container-rate-inner__star'>
          <SvgStar
            fill={'#5799ef'}
            height={starSize(value)}
            width={starSize(value)}
          />
          <p className='container-rate-inner__value'>{value ? value : '?'}</p>
        </div>
        <div className='container-rate-inner__close'>
          <button onClick={closeModal}>&#10006;</button>
        </div>
        <p className='container-rate-inner__title -title'>
          {t.movieCard.rateThis}
        </p>
        <p className='container-rate-inner__movie'>{movieTitle}</p>
        <Rating
          sx={{ color: '#5799ef', fontSize: '28px' }}
          name='customized-10'
          max={10}
          size='large'
          value={value}
          onChange={handleChange}
        />
        <div className='container-rate-inner-button'>
          <button
            className={`container-rate-inner-button__button ${
              value === null ? 'disabled' : ''
            } `}
            disabled={value !== null ? false : true}
            onClick={() => {
              isLogin ? rateAndClose(value) : (window.location.href = '/login');
            }}
            type='submit'
          >
            {t.buttons.rate}
          </button>
          {(isLogin && myRate) || isRated ? (
            <button
              className={`container-rate-inner-button__button remove-rating ${
                !isLogin && 'disabled'
              } `}
              onClick={delRating}
            >
              {t.buttons.removeRate}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};
