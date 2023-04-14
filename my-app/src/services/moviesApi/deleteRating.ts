import { apiAxios } from '..';

export const deleteRating = async (data: number) => {
  const response = await apiAxios.delete(`/movie/${data}/rating`);

  return response;
};
