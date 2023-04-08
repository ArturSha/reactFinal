import { useParams } from 'react-router-dom';
import { Container } from '../../common/Сontainer';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { useEffect } from 'react';
import {
  getMovieById,
  getVideoById,
} from '../../../redux/reducers/movieItem/movieItemReducer';
import { Loader } from '../../common/loader/Loader';
import './movieItem.scss';

function getTimeFromMins(mins: number = 0) {
  let hours = Math.trunc(mins / 60);
  let minutes = mins % 60;
  return hours + 'h ' + minutes + 'm';
}

export const MovieItem = () => {
  document.cookie = 'cookieName=cookieValue; SameSite=Strict';
  const dispatch = useAppDispatch();

  const isLoading = useAppSelector((state) => state.movieReducer.loading);

  const movieItem = useAppSelector((state) => state.movieReducer.movie);

  const language = useAppSelector((state) => state.authReducer.userLanguage);

  const video = useAppSelector((state) => state.movieReducer.video);

  const { id } = useParams();

  const data = { language, movie_id: id };

  useEffect(() => {
    dispatch(getMovieById(data));
    dispatch(getVideoById(data));
  }, [language]);

  const genres = movieItem?.genres.map((item) => {
    return <span key={item.id}>{item.name} </span>;
  });

  return (
    <Container className='movie-container'>
      {isLoading ? (
        <Loader />
      ) : (
        <Container className='movie-container-inner'>
          <h1>{movieItem?.title}</h1>
          <p>
            <span>{movieItem?.release_date.slice(0, 4)}</span>
            <span> {movieItem?.production_countries?.[0]?.name + ' '}</span>
            <span>{getTimeFromMins(movieItem?.runtime)} </span>
          </p>
          <div className='movie-container-inner-media'>
            <img
              src={
                movieItem?.poster_path
                  ? `https://image.tmdb.org/t/p/w300${movieItem?.poster_path}`
                  : 'https://media.istockphoto.com/id/878938228/vector/film-clapper-board-icon-on-yellow-background-with-shadow-blank-movie-clapper-cinema.jpg?s=170667a&w=0&k=20&c=XQU9uSuEHMs9ehyF9dD37MRjMgg_8vWw5wA1KUSTJtc='
              }
              alt="movie's poster"
            />
            <iframe
              width='800'
              height='450'
              src={`https://www.youtube-nocookie.com/embed/${video}`}
              title='YouTube video player'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              allowFullScreen={true}
            ></iframe>
          </div>
          {language === 'ru-RU' ? (
            <div className='movie-container-inner__warning'>
              Видео на русском языке может быть не доступно.
            </div>
          ) : null}
          <p className='movie-container-inner__genres'>{genres}</p>
          <p>{movieItem?.overview}</p>
        </Container>
      )}
    </Container>
  );
};
