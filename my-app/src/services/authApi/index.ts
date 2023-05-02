import { apiAxios } from '..';
import { IncomeArgsType } from '../../redux/reducers/auth/authRequestTypes';

const API_URL = 'authentication/';

export const authenticate = async (data: IncomeArgsType) => {
  const getToken = await apiAxios(`${API_URL}token/new`);

  const validateWithLogin = await apiAxios.post(
    `${API_URL}token/validate_with_login`,
    {
      username: data.username,
      password: data.password,
      request_token: getToken.data.request_token,
    }
  );
  if (validateWithLogin.data.success) {
    let expiresDate = new Date(validateWithLogin.data.expires_at);
    localStorage.setItem('expires', expiresDate.getTime().toString());
  }

  const getSessionID = await apiAxios.post(`${API_URL}session/new`, {
    request_token: getToken.data.request_token,
  });
  localStorage.setItem('sessionId', getSessionID.data.session_id);

  return getSessionID;
};
