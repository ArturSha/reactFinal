export interface MovieCardType {
  props: {
    title: string;
    poster_path?: string;
    vote_average: number;
    id: number;
    rating?: number | null;
  };
}
