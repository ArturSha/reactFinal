export function starSize(value: number | null) {
  let size: string = '96px';
  switch (value) {
    case 1:
      size = '96px';
      break;
    case 2:
      size = '100px';
      break;
    case 3:
      size = '104px';
      break;
    case 4:
      size = '108px';
      break;
    case 5:
      size = '112px';
      break;
    case 6:
      size = '116px';
      break;
    case 7:
      size = '120px';
      break;
    case 8:
      size = '124px';
      break;
    case 9:
      size = '128px';
      break;
    case 10:
      size = '132px';
      break;
    default:
      size = '96px';
  }
  return size;
}
