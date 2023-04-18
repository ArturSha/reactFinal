import { myWatchList } from '../../../redux/reducers/account/accountReducer';
import { Result } from '../../../redux/reducers/account/accountReducerTypes';
import { useAppSelector } from '../../../redux/store';
import { MoviesList } from '../../common/movieList/MovieList';

export const WatchList = () => {
  const isLoading = useAppSelector((state) => state.accountReducer.loading);

  const movies: Array<Result> = useAppSelector(
    (state) => state.accountReducer.watchList
  );
  return (
    <div>
      <MoviesList
        loading={isLoading}
        movies={movies}
        link={'watchlist'}
        query={myWatchList}
      />
    </div>
  );
};
