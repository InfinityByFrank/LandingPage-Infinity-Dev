import { useLandingInteractions } from '../hooks/useLandingInteractions';
import { useFx } from '../hooks/useFx';

export const LandingInteractions = () => {
  useLandingInteractions();
  useFx();

  return null;
};
