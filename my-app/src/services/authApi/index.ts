import axios from "axios";

const API_URL = 'https://api.themoviedb.org/3/authentication/token/';

export const apiAxiosAuth = axios.create({
    baseURL: API_URL,
  });
  