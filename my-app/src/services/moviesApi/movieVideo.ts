import { apiAxios } from '.';

export interface GetMovieIVideoType {
  movie_id: string | undefined;
  language: string;
}

export const getMovieVideo = async (data: GetMovieIVideoType) => {
  const response = await apiAxios({
    url: `${data.movie_id}/videos`,
    params: {
      language: data.language,
    },
  });
  return response ?? null;
};
