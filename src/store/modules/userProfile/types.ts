import { LoadingState } from '@/store/types';

export interface UserState extends LoadingState { }

const MODULE_NAME = 'userProfile';

export const mytationTypes = {
  getUserProfileStart: `[${MODULE_NAME}] getUserProfileStart`,
  getUserProfileSuccess: `[${MODULE_NAME}] getUserProfileSuccess`,
  getUserProfileFailure: `[${MODULE_NAME}] getUserProfileFailure`,

  addToFallowStart: `[${MODULE_NAME}] addToFallowStart`,
  addToFallowSuccess: `[${MODULE_NAME}] addToFallowSuccess`,
  addToFallowFailure: `[${MODULE_NAME}] addToFallowFailure`,
};

export const actionsTypes = {
  getUserProfile: `[${MODULE_NAME}] getUserProfile`,
  addToFallow: `[${MODULE_NAME}] addToFallow`,
};