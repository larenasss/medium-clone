import { RootState } from "@/store/types";
import { ActionTree } from "vuex";
import { UserState } from "@/store/modules/userProfile/types";
import userProfileApi from '@/api/userProfile';
import { mytationTypes, actionsTypes } from '@/store/modules/userProfile/types';

export const actions: ActionTree<UserState, RootState> = {
  [actionsTypes.getUserProfile]: async ({ commit }, { slug }: {slug: string}) => {
    try {
      commit(mytationTypes.getUserProfileStart);
      const user = await userProfileApi.getUserProfile(slug);
      commit(mytationTypes.getUserProfileSuccess, user);
    } catch (e) {
      commit(mytationTypes.getUserProfileFailure);
      throw e;
    }
  },
  [actionsTypes.addToFallow]: async ({ commit }, { slug, isFallow }: { slug: string, isFallow: boolean }) => {
    try {
      commit(mytationTypes.addToFallowStart);
      isFallow
        ? await userProfileApi.removeFromFallow(slug)
        : await userProfileApi.addToFallow(slug);
      commit(mytationTypes.addToFallowSuccess);
    } catch (e) {
      commit(mytationTypes.addToFallowFailure);
      throw e;
    }
  }
};