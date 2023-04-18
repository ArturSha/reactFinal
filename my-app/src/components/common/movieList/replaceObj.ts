import { Result } from '../../../redux/reducers/account/accountReducerTypes';

export const replaceObjects = (
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
      result[index] = secondItem;
    }
  });

  return result;
};
