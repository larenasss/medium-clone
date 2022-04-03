import { mytationTypes as authMytationTypes } from '@/store/modules/auth';

export default {
  state() {
    return {
      isSubmitting: false,
      validationErrors: null
    };
  },
  mutations: {
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
  }
};