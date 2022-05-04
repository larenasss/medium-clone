import { RootState } from "@/store/types";
import { ActionTree } from "vuex";
import { FeedState } from '@/store/modules/feed/types';
import feedApi from '@/api/feed';
import { mytationTypes, actionsTypes } from '@/store/modules/feed/types';

export const actions: ActionTree<FeedState, RootState> = {
  [actionsTypes.getFeed]: async ({ commit }: {commit: Function}, { apiUrl }: {apiUrl: string}) => {
    try {
      commit(mytationTypes.getFeedStart);
      const { data } = await feedApi.getFeed(apiUrl);
      commit(mytationTypes.getFeedSuccess, data);
    } catch (e) {
      commit(mytationTypes.getFeedFailure);
      throw e;
    }
  }
};