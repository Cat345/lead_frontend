import { HttpError } from '@refinedev/core'; //TODO: Rewrite to axios-jwt after backend
import axios from 'axios';
// import { IAuthTokens, TokenRefreshRequest, applyAuthTokenInterceptor } from 'axios-jwt';

// const BASE_URL = import.meta.env.VITE_BACKEND_URL;
export const api = axios.create({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('auth')}`,
  },
});

api.interceptors.response.use(
  (response) => {
    console.log(response);
    return response;
  },
  (error) => {
    console.error(error);
    const customError: HttpError = {
      ...error,
      message: error.response?.data?.message,
      statusCode: error.response?.status,
    };

    return Promise.reject(customError);
  }
);

// const requestRefresh: TokenRefreshRequest = async (
//   refresh_token: string
// ): Promise<IAuthTokens | string> => {
//   const response = await axios.post(`${BASE_URL}/auth/refresh`, { token: refresh_token });
//   return response.data.access_token;
// };
// applyAuthTokenInterceptor(api, { requestRefresh });
