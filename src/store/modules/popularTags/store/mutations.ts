import { MutationTree } from "vuex";
import { PopularTagsState, mytationTypes } from '@/store/modules/popularTags/types';
import { Tag } from "@/entities/tag";

export const mutations: MutationTree<PopularTagsState> = {
  [mytationTypes.getPopularTagsStart](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mytationTypes.getPopularTagsSuccess](state, payload: Array<Tag>) {
    state.isLoading = false;
    state.data = payload;
  },
  [mytationTypes.getPopularTagsFailure](state) {
    state.isLoading = false;
  }
};