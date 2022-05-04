import { MutationTree } from "vuex";
import { mytationTypes as authMytationTypes } from '@/store/modules/auth/types';
import { SettingsState } from "@/store/modules/settings/types";

export const mutations: MutationTree<SettingsState> = {
  [authMytationTypes.updateCurrentUserStart](state) {
    state.isSubmitting = true;
    state.validationErrors = null;
  },
  [authMytationTypes.updateCurrentUserSuccess](state) {
    state.isSubmitting = false;
  },
  [authMytationTypes.updateCurrentUserFailure](state, payload) {
    state.isSubmitting = false;
    state.validationErrors = payload;
  },
};