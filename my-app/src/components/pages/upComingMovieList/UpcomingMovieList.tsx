import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { getUpcomingMovies } from '../../../redux/reducers/movieList/movieListReducer';
import { Result } from '../../../redux/reducers/movieList/movieListReducerTypes';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { Container } from '../../common/Сontainer';
import { MovieCard } from '../../movieCard/MovieCard';
import './UpcomingMovieList.scss';

export const UpcomingMovieList = () => {
  const isLoading = useAppSelector((state) => state.movieListReducer.loading);
  const language = useAppSelector((state) => state.authReducer.userLanguage);

  const movies: Array<Result> = useAppSelector(
    (state) => state.movieListReducer.movieList
  );

  const dispatch = useAppDispatch();

  const [page, setPage] = useState<number>(1);

  const nextPage = () => {
    setPage(page + 1);
  };
  const prevPage = () => {
    setPage(page - 1);
  };
  const data = {
    page,
    language,
  };

  useEffect(() => {
    dispatch(getUpcomingMovies(data));
  }, [page, language]);

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
        Previous
      </button>
      <button
        className='upcoming-container__button -next'
        onClick={nextPage}
        disabled={isLoading ? true : false}
      >
        Next
      </button>
    </Container>
  );
};
