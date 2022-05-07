import { MutationTree } from "vuex";
import { FeedState, mytationTypes } from '@/store/modules/feed/types';
import { Feed } from "@/entities/feed";

export const mutations: MutationTree<FeedState> = {
  [mytationTypes.getFeedStart](state: any) {
    state.isLoading = true;
    state.data = null;
  },
  [mytationTypes.getFeedSuccess](state, payload: Feed) {
    state.isLoading = false;
    state.data = payload;
  },
  [mytationTypes.getFeedFailure](state: any) {
    state.isLoading = false;
  }
};