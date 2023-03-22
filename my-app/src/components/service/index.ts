import axios from 'axios';

const API_URL = 'https://api.themoviedb.org/3/';
// export const API_KEY = 'api_key=d72e13adb1190ab152f566a4fa9b8135';

export const apiAxios = axios.create({
  baseURL: API_URL,
});
