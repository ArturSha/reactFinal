import { Result } from '../../../redux/reducers/account/accountReducerTypes';

// export const getFilteredMovies = (
//   firstArray: Result[],
//   secondArray: Result[],
//   key: keyof Result
// ) => {
//   const result = [...firstArray];

//   secondArray.forEach((secondItem) => {
//     const index = result.findIndex(
//       (firstItem) => firstItem[key] === secondItem[key]
//     );

//     if (index !== -1) {
//       result[index] = {
//         ...secondItem,
//         watchlist: true,
//       };
//     }
//   });

//   return result;
// };

export const getFilteredMovies = (
  firstArray: Result[],
  secondArray: Result[],
  key: keyof Result
) => {
  const result = [...firstArray];

  secondArray.forEach((secondItem) => {
    const index = result.findIndex(
      (firstItem) => firstItem[key] === secondItem[key]
    );

    if (index !== -1) {
      result[index] = {
        ...result[index],
        watchlist: true,
      };
    }
  });

  return result;
};
