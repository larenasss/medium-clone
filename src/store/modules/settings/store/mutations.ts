import { MutationTree } from "vuex";
import { SettingsState } from "@/store/modules/settings/types";

export const mutations: MutationTree<SettingsState> = {
  updateCurrentUserStart(state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  updateCurrentUserSuccess(state) {
    state.isSubmitting = false;
  },
  updateCurrentUserFailure(state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
};