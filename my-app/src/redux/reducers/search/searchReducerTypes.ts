export interface Root {
  page: number;
  results: Result[];
  total_results: number;
  total_pages: number;
}

type CloseListFn = () => void;

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
  closeList: CloseListFn;
}

export interface InitialStateType {
  searchList: Result[];
  isLoading: boolean;
  error: null | string | unknown;
}
