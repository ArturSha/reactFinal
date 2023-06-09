import { useEffect, useState } from 'react';
import { Result } from '../../../redux/reducers/account/accountReducerTypes';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { Container } from '../container/Сontainer';
import { MovieCard } from '../../movieCard/MovieCard';
import { useTranslation } from '../../../hooks/useTranslations';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader } from '../loader/Loader';
import {
  myWatchList,
  ratedMovies,
} from '../../../redux/reducers/account/accountReducer';
import { replaceObjects } from './replaceObj';
import './movieList.scss';
import { getFilteredMovies } from './isInWatchlist';

interface MovieListTypes {
  loading: boolean;
  movies: Result[];
  link: string;
  query: (data: { page: string | undefined; language: string }) => any;
}

export const MoviesList: React.FC<MovieListTypes> = (props) => {
  const language = useAppSelector((state) => state.authReducer.userLanguage);

  const rated = useAppSelector((state) => state.accountReducer.ratedMovies);

  const watchlist = useAppSelector((state) => state.accountReducer.watchList);

  const isLoading = props.loading;

  const { p } = useParams<{ p: string }>();

  const { t } = useTranslation();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [page, setPage] = useState<number>(1);

  const nextPage = () => {
    setPage(page + 1);
    navigate(`/${props.link}/${1 + page}`);
  };
  const prevPage = () => {
    setPage(page - 1);
    navigate(`/${props.link}/${page - 1}`);
  };
  const data = {
    page: p,
    language,
  };

  useEffect(() => {
    const dispatchMyWatchList = () => {
      if (props.link !== 'watchlist') {
        dispatch(myWatchList(data));
      }
    };
    dispatch(ratedMovies());

    dispatchMyWatchList();

    dispatch(props.query(data));

    setPage(Number(p));
  }, [p, language]);

  const ratedList = replaceObjects(props.movies, rated, 'id');

  const filteredMovies = getFilteredMovies(ratedList, watchlist, 'id');

  return (
    <Container className='upcoming-container'>
      {filteredMovies.map((item) => (
        <MovieCard key={item.id} props={item}></MovieCard>
      ))}
      {isLoading && <Loader />}
      <div className='upcoming-container-button'>
        <button
          className='upcoming-container-button__button'
          onClick={prevPage}
          disabled={isLoading ? true : false || page === 1}
        >
          {t.buttons.prev}
        </button>
        <button
          className='upcoming-container-button__button -next'
          onClick={nextPage}
          disabled={isLoading ? true : false}
        >
          {t.buttons.next}
        </button>
      </div>
    </Container>
  );
};
