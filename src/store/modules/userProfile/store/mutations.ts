import { MutationTree } from "vuex";
import { UserState } from "../types";
import { mytationTypes } from "../types";

export const mutations: MutationTree<UserState> = {
  [mytationTypes.getUserProfileStart](state) {
      state.isLoading = true;
      state.data = null;
    },
    [mytationTypes.getUserProfileSuccess](state, payload: any) {
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