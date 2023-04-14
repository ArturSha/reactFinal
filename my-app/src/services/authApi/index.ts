import { apiAxios } from '..';
import { IncomeArgsType } from '../../redux/reducers/auth/authRequestTypes';

const API_URL = 'authentication/';

export const authenticate = async (data: IncomeArgsType) => {
  const getToken = await apiAxios(`${API_URL}token/new`);

  await apiAxios.post(`${API_URL}token/validate_with_login`, {
    username: data.username,
    password: data.password,
    request_token: getToken.data.request_token,
  });

  const getSessionID = await apiAxios.post(`${API_URL}session/new`, {
    request_token: getToken.data.request_token,
  });

  return getSessionID;
};
