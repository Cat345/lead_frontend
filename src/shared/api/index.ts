import { HttpError } from '@refinedev/core';
import axios from 'axios';

import { TOKEN_KEY } from '../../refine/auth/authProvider';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;
export const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((request) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (request.headers) {
    request.headers.Authorization = `Bearer ${token}`;
  }
  return request;
});

api.interceptors.response.use(
  (response) => {
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
