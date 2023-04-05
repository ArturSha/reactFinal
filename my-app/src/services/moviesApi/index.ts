import axios from 'axios';

export const API_URL = 'https://api.themoviedb.org/3/movie/';
export const API_KEY = 'd72e13adb1190ab152f566a4fa9b8135';


export const apiAxios = axios.create({
  baseURL: API_URL,
  params: {
    api_key: API_KEY,
  },
});
