import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { getUpcomingMovies } from '../../../redux/reducers/movieList/movieListReducer';
import { Result } from '../../../redux/reducers/movieList/movieListReducerTypes';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { Container } from '../../common/Сontainer';
import { MovieCard } from '../../movieCard/MovieCard';
import { useTranslation } from '../../../hooks/useTranslations';
import { useNavigate, useParams } from 'react-router-dom';
import './UpcomingMovieList.scss';

export const UpcomingMovieList = () => {
  const { p } = useParams();

  const isLoading = useAppSelector((state) => state.movieListReducer.loading);

  const language = useAppSelector((state) => state.authReducer.userLanguage);

  const { t } = useTranslation();

  const navigate = useNavigate();

  const movies: Array<Result> = useAppSelector(
    (state) => state.movieListReducer.movieList
  );

  const dispatch = useAppDispatch();

  const [page, setPage] = useState<number>(1);

  const nextPage = () => {
    setPage(page + 1);
    navigate(`/upComing/${1 + page}`);
  };
  const prevPage = () => {
    setPage(page - 1);
    navigate(`/upComing/${page - 1}`);
  };
  const data = {
    page: p,
    language,
  };

  useEffect(() => {
    dispatch(getUpcomingMovies(data));
    setPage(Number(p));
  }, [p, language]);

  return (
    <Container className='upcoming-container'>
      {movies.map((item) => (
        <MovieCard key={item.id} props={item}></MovieCard>
      ))}
      {isLoading && <CircularProgress className='upcoming-container__loader' />}
      <button
        className='upcoming-container__button'
        onClick={prevPage}
        disabled={isLoading ? true : false || page === 1}
      >
        {t.buttons.prev}
      </button>
      <button
        className='upcoming-container__button -next'
        onClick={nextPage}
        disabled={isLoading ? true : false}
      >
        {t.buttons.next}
      </button>
    </Container>
  );
};
