import { LoadingState } from '@/store/types';

export interface PopularTagsState extends LoadingState { }

const MODULE_NAME = 'popularTags';

export const mytationTypes = {
  getPopularTagsStart: `[${MODULE_NAME}] getPopularTagsStart`,
  getPopularTagsSuccess: `[${MODULE_NAME}] getPopularTagsSuccess`,
  getPopularTagsFailure: `[${MODULE_NAME}] getPopularTagsFailure`,
};

export const actionsTypes = {
  getPopularTags: `[${MODULE_NAME}] getPopularTags`
};