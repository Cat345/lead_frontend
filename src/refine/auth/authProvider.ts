import {
  AuthActionResponse,
  CheckResponse,
  OnErrorResponse,
  PermissionResponse,
} from '@refinedev/core/dist/interfaces';
import { decodeToken } from 'react-jwt';

import { api } from '../../shared/api';
import { TokenPayload } from './TokenPayload';

export type AuthBindings = {
  login: (params: any) => Promise<AuthActionResponse>;
  logout: (params: any) => Promise<AuthActionResponse>;
  check: (params?: any) => Promise<CheckResponse>;
  onError: (error: any) => Promise<OnErrorResponse>;
  register?: (params: any) => Promise<AuthActionResponse>;
  forgotPassword: (params: any) => Promise<AuthActionResponse>;
  updatePassword?: (params: any) => Promise<AuthActionResponse>;
  getPermissions?: (params?: any) => Promise<PermissionResponse>;
  getIdentity: (params?: any) => any;
};

export const TOKEN_KEY = 'auth';
const BASE_URL = import.meta.env.VITE_BACKEND_URL;
export const authProvider: AuthBindings = {
  register: async ({ email, password }) => {
    if (!(email && password)) {
      return {
        success: false,
        error: {
          name: 'Ошибка регистрации',
          message: 'Неверный email или пароль',
        },
      };
    }

    const {
      data: { access_token: tokenKey },
    } = await api.post(BASE_URL + 'auth/register', {
      email,
      password,
    });

    localStorage.setItem(TOKEN_KEY, tokenKey);
    return {
      success: true,
      redirectTo: '/',
    };
  },
  login: async ({ email, password }) => {
    if (!(email && password)) {
      return {
        success: false,
        error: {
          name: 'Ошибка входа',
          message: 'Неверный email или пароль',
        },
      };
    }

    const {
      data: { access_token: tokenKey },
    } = await api.post(BASE_URL + 'auth/login', {
      email,
      password,
    });

    localStorage.setItem(TOKEN_KEY, tokenKey);
    return {
      success: true,
      redirectTo: '/',
    };
  },
  logout: async () => {
    localStorage.removeItem(TOKEN_KEY);
    return {
      success: true,
      redirectTo: '/login',
    };
  },
  check: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        authenticated: true,
      };
    }

    return {
      authenticated: false,
      redirectTo: '/login',
    };
  },
  updatePassword: async ({ password, confirmPassword, uuid }) => {
    const response = await api.post(BASE_URL + 'auth/update-password', {
      password,
      confirmPassword,
      uuid,
    });
    const tokenKey = response.data?.access_token;

    if (tokenKey) {
      localStorage.setItem(TOKEN_KEY, tokenKey);
      return {
        success: true,
        redirectTo: '/',
      };
    }
    return {
      success: false,
      error: {
        name: 'Ошибка',
        message: 'Непредвиденная ошибка, попробуйте позже',
      },
    };
  },
  getPermissions: async () => null,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  getIdentity: async () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return null;
    const userToken = decodeToken<TokenPayload>(token);
    if (!userToken) return null;

    const { data: user } = await api.get(BASE_URL + `users/${userToken.sub}`);
    return user;
  },

  forgotPassword: async (payload: { email: string }) => {
    const response = await api.post(BASE_URL + 'auth/forgot-password', payload);
    if (response.status === 404) {
      return {
        success: false,
        error: {
          name: 'Ошибка',
          message: 'Такой email не зарегистрирован',
        },
      };
    }
    if (response.status === 201) {
      return {
        success: true,
        redirectTo: '/forgot-password',
      };
    }
    return {
      success: false,
      error: {
        name: 'Ошибка',
        message: 'Неизвестная ошибка, попробуйте позже',
      },
    };

    // if request is not successful
  },
  onError: async (error) => {
    return { error };
  },
};
