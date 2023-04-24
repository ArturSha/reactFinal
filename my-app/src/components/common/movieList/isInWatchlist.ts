import { Result } from '../../../redux/reducers/account/accountReducerTypes';

export const getFilteredMovies = (
  firstArray: Result[],
  secondArray: Result[],
  key: keyof Result
) => {
  const result = firstArray.map((item) => {
    const index = secondArray.findIndex(
      (secondItem) => secondItem[key] === item[key]
    );

    if (index !== -1) {
      return {
        ...item,
        watchlist: true,
      };
    }

    return item;
  });
  return result;
};
