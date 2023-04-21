import { Result } from '../../../redux/reducers/account/accountReducerTypes';
import { getUpcomingMovies } from '../../../redux/reducers/movieList/movieListReducer';
import { useAppSelector } from '../../../redux/store';
import { MoviesList } from '../../common/movieList/MovieList';

export const UpcomingMovieList = () => {
  const isLoading = useAppSelector((state) => state.movieListReducer.loading);

  const movies: Array<Result> = useAppSelector(
    (state) => state.movieListReducer.movieList
  );

  return (
    <div>
      <MoviesList
        loading={isLoading}
        movies={movies}
        link={'upComing'}
        query={getUpcomingMovies}
      />
    </div>
  );
};
