import axios from 'axios';

export const API_URL = 'https://api.themoviedb.org/3/';
export const API_KEY = 'd72e13adb1190ab152f566a4fa9b8135';

export const apiAxios = axios.create({
  baseURL: API_URL,
  params: {
    language: localStorage.getItem('language'),
    api_key: API_KEY,
    session_id: localStorage.getItem('sessionId'),
  },
});
