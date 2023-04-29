export type InitialStateType = {
  movieList: Array<Result>;
  error: null | string | unknown;
  loading: boolean;
};
export interface Root {
  page: number;
  results: Result[];
  dates: Dates;
  total_pages: number;
  total_results: number;
}

export interface Result {
  poster_path?: string;
  adult: boolean;
  overview: string;
  release_date: string;
  genre_ids: number[];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path?: string;
  popularity: number;
  vote_count: number;
  video: boolean;
  vote_average: number;
  rating: number | undefined;
}

export interface Dates {
  maximum: string;
  minimum: string;
}

export interface IncomingData {
  page: string | undefined;
  language: string;
}
