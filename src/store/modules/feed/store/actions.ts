import { RootState } from "@/store/types";
import { ActionTree } from "vuex";
import { FeedState } from '@/store/modules/feed/types';
import feedApi from '@/api/feed';
import { mytationTypes, actionsTypes } from '@/store/modules/feed/types';
import { Feed } from "@/entities/feed";

export const actions: ActionTree<FeedState, RootState> = {
  [actionsTypes.getFeed]: async ({ commit }, { apiUrl }: {apiUrl: string}) => {
    try {
      commit(mytationTypes.getFeedStart);
      const { data }: { data: Feed } = await feedApi.getFeed(apiUrl);
      commit(mytationTypes.getFeedSuccess, data);
    } catch (e) {
      commit(mytationTypes.getFeedFailure);
      throw e;
    }
  }
};