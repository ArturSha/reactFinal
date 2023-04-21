import { apiAxios } from '..';

export const searchMovies = async (query: string) => {
  const response = await apiAxios('search/movie', {
    params: {
      language: localStorage.getItem('language'),
      query: query,
    },
  });

  return response.data;
};
