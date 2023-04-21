import { Link } from 'react-router-dom';
import { Result } from '../../redux/reducers/search/searchReducerTypes';
import { changeReleaseDateFormat } from './changeDateFormat';
import poster from '../images/comingSoon.jpg';
import './search.scss';

export const SearchItem: React.FC<Result> = ({
  closeList,
  title,
  id,
  poster_path,
  overview,
  release_date,
  genre_ids,
  original_title,
  original_language,
  backdrop_path,
  popularity,
  vote_count,
  video,
  vote_average,
}) => {
  return (
    <div onClick={closeList} className='container-search-card'>
      <div className='container-search-card-img'>
        <Link to={`/movie/${id}`}>
          <img
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w200${poster_path}`
                : poster
            }
            alt={title}
          />
        </Link>
      </div>
      <div className='container-search-card-description'>
        <Link to={`/movie/${id}`}>
          <p>{title}</p>
        </Link>
        <p className='container-search-card-description__release'>
          {changeReleaseDateFormat(release_date)}
        </p>
        <p className='container-search-card-description__overview'>
          {overview}
        </p>
      </div>
    </div>
  );
};
