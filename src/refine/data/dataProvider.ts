import { DataProvider } from '@refinedev/core';
import { AxiosInstance } from 'axios';
import { stringify } from 'query-string';

import { generateFilter, generateSort } from './utils';

type MethodTypes = 'get' | 'delete' | 'head' | 'options';
type MethodTypesWithBody = 'post' | 'put' | 'patch';

const getAuthorization = () => ({
  Authorization: `Bearer ${localStorage.getItem('auth')}`,
});

export const dataProvider = (
  apiUrl: string,
  httpClient: AxiosInstance
): Omit<Required<DataProvider>, 'createMany' | 'updateMany' | 'deleteMany'> => ({
  getList: async ({ resource, filters, sorters, meta, pagination }) => {
    const url = `${apiUrl}${resource}`;

    const { current = 1, pageSize = 100, mode = 'server' } = pagination ?? {};

    const { headers: headersFromMeta, method } = meta ?? {};
    const requestMethod = (method as MethodTypes) ?? 'get';

    const queryFilters = generateFilter(filters);

    // const query: {
    //   _start?: number;
    //   _end?: number;
    //   _sort?: string;
    //   _order?: string;
    // } = {};

    const query: {
      // start?: number;
      // end?: number;
      take?: number;
      skip?: number;
      sort?: string;
      order?: string;
    } = {};

    if (mode === 'server') {
      // query.start = (current - 1) * pageSize;
      // query.end = current * pageSize;
      query.take = pageSize;
      query.skip = (current - 1) * pageSize;
    }

    const generatedSort = generateSort(sorters);
    if (generatedSort) {
      const { _sort, _order } = generatedSort;
      query.sort = _sort.join(',');
      query.order = _order.join(',');
    }

    const auth = getAuthorization();
    const { data } = await httpClient[requestMethod](
      `${url}?${stringify(query)}&${stringify(queryFilters)}`,
      {
        headers: {
          ...auth,
          ...headersFromMeta,
        },
      }
    );
    console.log(data, 'data');

    return {
      data: data.list,
      total: data.total || data.length,
      // total: 30,
    };
  },

  getMany: async ({ resource, ids, meta }) => {
    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypes) ?? 'get';

    const { data } = await httpClient[requestMethod](
      `${apiUrl}/${resource}?${stringify({ id: ids })}`,
      {
        headers: {
          ...headers,
          ...getAuthorization(),
        },
      }
    );

    return {
      data,
    };
  },

  create: async ({ resource, variables, meta }) => {
    const url = `${apiUrl}${resource}`;

    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypesWithBody) ?? 'post';

    const { data } = await httpClient[requestMethod](url, variables, {
      headers: {
        ...headers,
        ...getAuthorization(),
      },
    });
    console.log(data, 'data');

    return {
      data,
    };
  },

  update: async ({ resource, id, variables, meta }) => {
    const url = `${apiUrl}${resource}/${id}`;

    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypesWithBody) ?? 'patch';

    const { data } = await httpClient[requestMethod](url, variables, {
      headers: {
        ...headers,
        ...getAuthorization(),
      },
    });

    return {
      data,
    };
  },

  getOne: async ({ resource, id, meta }) => {
    const url = `${apiUrl}${resource}/${id}`;

    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypes) ?? 'get';

    const { data } = await httpClient[requestMethod](url, {
      headers: {
        ...headers,
        ...getAuthorization(),
      },
    });

    return {
      data,
    };
  },

  deleteOne: async ({ resource, id, variables, meta }) => {
    const url = `${apiUrl}${resource}/${id}`;

    const { headers, method } = meta ?? {};
    const requestMethod = (method as MethodTypesWithBody) ?? 'delete';

    const { data } = await httpClient[requestMethod](url, {
      data: variables,
      headers: {
        ...headers,
        ...getAuthorization(),
      },
    });

    return {
      data,
    };
  },

  getApiUrl: () => {
    return apiUrl;
  },

  custom: async ({ url, method, filters, sorters, payload, query, headers }) => {
    let requestUrl = `${url}?`;

    if (sorters) {
      const generatedSort = generateSort(sorters);
      if (generatedSort) {
        const { _sort, _order } = generatedSort;
        const sortQuery = {
          _sort: _sort.join(','),
          _order: _order.join(','),
        };
        requestUrl = `${requestUrl}&${stringify(sortQuery)}`;
      }
    }

    if (filters) {
      const filterQuery = generateFilter(filters);
      requestUrl = `${requestUrl}&${stringify(filterQuery)}`;
    }

    if (query) {
      requestUrl = `${requestUrl}&${stringify(query)}`;
    }

    let axiosResponse;
    switch (method) {
      case 'put':
      case 'post':
      case 'patch':
        axiosResponse = await httpClient[method](url, payload, {
          headers: {
            ...headers,
            ...getAuthorization(),
          },
        });
        break;
      case 'delete':
        axiosResponse = await httpClient.delete(url, {
          data: payload,
          headers: {
            ...headers,
            ...getAuthorization(),
          },
        });
        break;
      default:
        axiosResponse = await httpClient.get(requestUrl, {
          headers: {
            ...headers,
            ...getAuthorization(),
          },
        });
        break;
    }

    const { data } = axiosResponse;

    return Promise.resolve({ data });
  },
});
