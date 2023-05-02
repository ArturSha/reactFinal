import { apiAxios } from '../index';

export interface IncomeData {
  id: number;
  add: boolean;
}
export interface WatchListParams {
  page: string | undefined;
}

export const getWatchList = async (page: WatchListParams) => {
  const response = await apiAxios('account/{account_id}/watchlist/movies', {
    params: {
      language: localStorage.getItem('language'),
      page: page.page,
      session_id: localStorage.getItem('sessionId'),
    },
  });
  return response;
};

export const addToWatchlist = async (data: IncomeData) => {
  const response = await apiAxios.post('account/{account_id}/watchlist', {
    media_type: 'movie',
    media_id: data.id,
    watchlist: data.add,
  });

  return response;
};
