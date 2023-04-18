import { apiAxios } from '../index';

export interface IncomeData {
  id: number;
  add: boolean;
}

export const getWatchList = async () => {
  const response = await apiAxios('account/{account_id}/watchlist/movies', {
    params: {
      language: localStorage.getItem('language') ?? 'en-US',
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
