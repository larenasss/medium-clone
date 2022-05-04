import { MutationTree } from "vuex";
import { FeedState, mytationTypes } from '@/store/modules/feed/types';

export const mutations: MutationTree<FeedState> = {
  [mytationTypes.getFeedStart](state: any) {
    state.isLoading = true;
    state.data = null;
  },
  [mytationTypes.getFeedSuccess](state: any, payload: any) {
    state.isLoading = false;
    state.data = payload;
  },
  [mytationTypes.getFeedFailure](state: any) {
    state.isLoading = false;
  }
};