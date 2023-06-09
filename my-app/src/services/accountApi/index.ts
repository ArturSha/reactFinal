import { apiAxios } from '..';

export const getRatedMovies = async () => {
  const response = await apiAxios(`account/{account_id}/rated/movies`, {
    params: {
      language: localStorage.getItem('language'),
      session_id: localStorage.getItem('sessionId'),
    },
  });
  return response;
};
