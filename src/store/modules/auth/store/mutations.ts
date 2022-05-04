import { MutationTree } from "vuex";
import { AuthState } from "@/store/modules/auth/types";
import { mytationTypes } from "@/store/modules/auth/types";

export const mutations: MutationTree<AuthState> = {
   [mytationTypes.registerStart](state) {
      state.isSubmitting = true;
      state.validationErrors = null;
    },
    [mytationTypes.registerSuccess](state, payload) {
      state.isSubmitting = false;
      state.currentUser = payload;
      state.isLoggedIn = true;
    },
    [mytationTypes.registerFailure](state, payload) {
      state.isSubmitting = false;
      state.validationErrors = payload;
    },
    [mytationTypes.loginStart](state) {
      state.isSubmitting = true;
      state.validationErrors = null;
    },
    [mytationTypes.loginSuccess](state, payload) {
      state.isSubmitting = false;
      state.currentUser = payload;
      state.isLoggedIn = true;
    },
    [mytationTypes.loginFailure](state, payload) {
      state.isSubmitting = false;
      state.validationErrors = payload;
    },
    [mytationTypes.getCurrentUserStart](state) {
      state.isLoading = true;
    },
    [mytationTypes.getCurrentUserSuccess](state, payload) {
      state.currentUser = payload;
      state.isLoading = false;
      state.isLoggedIn = true;
    },
    [mytationTypes.getCurrentUserFailure](state) {
      state.isLoading = false;
      state.isLoggedIn = false;
      state.currentUser = null;
    },
    [mytationTypes.updateCurrentUserStart]() {},
    [mytationTypes.updateCurrentUserSuccess](state, payload) {
      state.currentUser = payload;
    },
    [mytationTypes.updateCurrentUserFailure]() {},
    [mytationTypes.logout](state) {
      state.currentUser = null;
      state.isLoggedIn = false;
    }
};