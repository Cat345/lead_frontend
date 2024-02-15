import {
  AuthActionResponse,
  CheckResponse,
  OnErrorResponse,
  PermissionResponse,
} from '@refinedev/core/dist/interfaces';
import { decodeToken } from 'react-jwt';

import { api } from '../../shared/api';

export type AuthBindings = {
  login: (params: any) => Promise<AuthActionResponse>;
  logout: (params: any) => Promise<AuthActionResponse>;
  check: (params?: any) => Promise<CheckResponse>;
  onError: (error: any) => Promise<OnErrorResponse>;
  register?: (params: any) => Promise<AuthActionResponse>;
  forgotPassword?: (params: any) => Promise<AuthActionResponse>;
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

    api.defaults.headers.common = {
      Authorization: `Bearer ${tokenKey}`,
    };
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

    api.defaults.headers.common = {
      Authorization: `Bearer ${tokenKey}`,
    };
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
  updatePassword: async (...args: any) => {
    return {
      success: false,
    };
  },
  getPermissions: async () => null,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  getIdentity: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return null;

    return decodeToken(token);
  },
  onError: async (error) => {
    return { error };
  },
};
