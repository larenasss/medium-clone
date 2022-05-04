import { mytationTypes as authMytationTypes } from '@/store/modules/auth/types';

export default {
  state() {
    return {
      isSubmitting: false,
      validationErrors: null
    };
  },
  mutations: {
    [authMytationTypes.updateCurrentUserStart](state: any) {
      state.isSubmitting = true;
      state.validationErrors = null;
    },
    [authMytationTypes.updateCurrentUserSuccess](state: any) {
      state.isSubmitting = false;
    },
    [authMytationTypes.updateCurrentUserFailure](state: any, payload: any) {
      state.isSubmitting = false;
      state.validationErrors = payload;
    },
  }
};