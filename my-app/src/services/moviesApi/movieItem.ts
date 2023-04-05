import { apiAxios } from '.';

export interface GetMovieItemType {
  movie_id: string | undefined;
  language: string;
}

export const getMovieItem = async (data: GetMovieItemType) => {
  const response = await apiAxios({
    url: `${data.movie_id}`,
    params: {
      language: data.language,
    },
  });
  return response;
};
