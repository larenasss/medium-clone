import { mytationTypesExport as authMytationTypesExport} from '@/store/modules/auth';

export const mytationTypesExport = authMytationTypesExport;

export default {
  state() {
    return {
      isSubmitting: false,
      validationErrors: null
    };
  },
  mutations: {
    [authMytationTypesExport.updateCurrentUserStart](state) {
      console.log(1);
      state.isSubmitting = true;
      state.validationErrors = null;
    },
    [authMytationTypesExport.updateCurrentUserSuccess](state) {
      state.isSubmitting = false;
    },
    [authMytationTypesExport.updateCurrentUserFailure](state, payload) {
      state.isSubmitting = false;
      state.validationErrors = payload;
    },
  }
};