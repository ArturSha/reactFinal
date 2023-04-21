export const changeReleaseDateFormat = (date: string) => {
  const lang = localStorage.getItem('language');
  const dateString: string = `${date}`;
  const dateObj = new Date(dateString);
  const monthName = dateObj.toLocaleString(`${lang}`, { month: 'long' });
  const day = dateObj.getDate();
  const year = dateObj.getFullYear();
  const resultString = `${day} ${monthName} ${year}`;
  return resultString;
};
