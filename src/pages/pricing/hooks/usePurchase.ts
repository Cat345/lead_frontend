import { useMutation } from '@tanstack/react-query';

import { api } from '../../../shared/api';

interface PurchaseResponse {
  url: string;
}

export const usePurchase = () => {
  const mutation = useMutation({
    mutationFn: async (tariffId: number) => {
      const { data } = await api.post<PurchaseResponse>('/subscription/morune', null, {
        params: {
          tariff: tariffId,
        },
      });
      return data;
    },
    onSuccess: (data) => {
      window.location.href = data.url;
    },
  });

  return {
    purchase: mutation.mutate,
    isPurchasing: mutation.isPending,
    error: mutation.error,
  };
};
