export interface Root {
  page: number;
  results: Result[];
  total_pages: number;
  total_results: number;
}

export interface Result {
  adult: boolean;
  backdrop_path?: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  release_date: string;
  poster_path?: string;
  popularity: number;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  rating: number | undefined;
  watchlist?: boolean;
}

export interface InitialStateTypes {
  ratedMovies: Result[] | [];
  watchList: Result[] | [];
  loading: boolean;
  error: null | string | unknown;
}
export interface WatchListResponseType {
  success: boolean;
  status_code: number;
  status_message: string;
}
