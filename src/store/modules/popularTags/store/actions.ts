import { RootState } from "@/store/types";
import { ActionTree } from "vuex";
import { PopularTagsState } from '@/store/modules/popularTags/types';
import popularTags from '@/api/popularTags';
import { mytationTypes, actionsTypes } from '@/store/modules/popularTags/types';

export const actions: ActionTree<PopularTagsState, RootState> = {
  [actionsTypes.getPopularTags]: async ({ commit }) => {
      try {
        commit(mytationTypes.getPopularTagsStart);
        const tags = await popularTags.getPopularTags();
        commit(mytationTypes.getPopularTagsSuccess, tags);
      } catch (e) {
        commit(mytationTypes.getPopularTagsFailure);
        throw e;
      }
    }
};