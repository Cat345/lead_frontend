import { useUtmStore } from '../useUtmStore';

export const useSaveUtmAndReferral = async () => {
  const params = new URLSearchParams(document.location.search);
  const utm = params.get('utm');
  const referral = params.get('referral');
  const saveUtmAndReferral = useUtmStore((store) => store.saveUtmAndReferral);
  (utm || referral) && saveUtmAndReferral(utm, referral);
};
