import { Rating } from '@mui/material';
import { useTranslation } from '../../../hooks/useTranslations';
import './rateMovie.scss';
import { useState } from 'react';
import { SvgStar } from '../svg/SvgStar';
import { starSize } from './setStarSize';

interface RatemovieType {
  isModalActive: boolean;
  setIsModalActive: (arg: boolean) => void;
  movieTitle: string;
}

export const RateMovie = ({
  isModalActive,
  setIsModalActive,
  movieTitle,
}: RatemovieType) => {
  const [value, setValue] = useState<number | null>(null);

  const handleChange = (
    _event: React.ChangeEvent<{}>,
    newValue: number | null
  ) => {
    setValue(newValue);
  };

  const { t } = useTranslation();

  const closeModal = () => {
    setIsModalActive(!isModalActive);
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
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
        <p className='container-rate-inner__title'>{t.movieCard.rateThis}</p>
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
          <button type='submit'>{t.buttons.rate}</button>
        </div>
      </div>
    </div>
  );
};
