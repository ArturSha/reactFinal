import { apiAxios } from '..';

interface RateMovieType {
  id: number;
  value: number | null;
}

export const rateMovie = async (data: RateMovieType) => {
  const response = await apiAxios.post(`/movie/${data.id}/rating`, {
    value: data.value,
  });

  return response;
};
