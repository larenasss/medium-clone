import { Feed } from '@/entities/feed';
import { LoadingState } from '@/store/types';

export interface FeedState extends LoadingState<Feed> { }

const MODULE_NAME = 'feed';

export const mytationTypes = {
  getFeedStart: `[${MODULE_NAME}] getFeedStart`,
  getFeedSuccess: `[${MODULE_NAME}] getFeedSuccess`,
  getFeedFailure: `[${MODULE_NAME}] getFeedFailure`,
};

export const actionsTypes = {
  getFeed: `[${MODULE_NAME}] getFeed`
};