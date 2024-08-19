import { create } from 'zustand';

interface UtmStore {
  utm: string | null;
  referral: string | null;
  saveUtmAndReferral: (utm: string | null, referral: string | null) => void;
}

export const useUtmStore = create<UtmStore>()((set) => ({
  utm: '',
  referral: '',
  saveUtmAndReferral: (utm, referral) => {
    set((state) => ({
      ...state,
      utm,
      referral,
    }));
  },
}));
