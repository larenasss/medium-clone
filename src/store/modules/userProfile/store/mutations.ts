import { MutationTree } from "vuex";
import { UserState } from "@/store/modules/userProfile/types";
import { mytationTypes } from "@/store/modules/userProfile/types";
import { UserProfile } from "@/entities/user";

export const mutations: MutationTree<UserState> = {
  [mytationTypes.getUserProfileStart](state) {
      state.isLoading = true;
      state.data = null;
    },
    [mytationTypes.getUserProfileSuccess](state, payload: UserProfile) {
      state.isLoading = false;
      state.data = payload;
    },
    [mytationTypes.getUserProfileFailure](state) {
      state.isLoading = false;
    },
    [mytationTypes.addToFallowStart]() {},
    [mytationTypes.addToFallowSuccess]() {},
    [mytationTypes.addToFallowFailure]() {},
};