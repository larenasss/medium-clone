import authApi from '@/api/auth';
import { setItem } from '@/helpers/persistanceStorage';

import { createTypesFromModuleName } from '@/helpers/typesStore';

const MODULE_NAME = 'auth';

const mytationTypes = {
  registerStart: 'registerStart',
  registerSuccess: 'registerSuccess',
  registerFailure: 'registerFailure'
};

const actionsTypes = {
  register: 'register'
};

export const actionsTypesExport = createTypesFromModuleName(MODULE_NAME, actionsTypes);
export const mytationTypesExport = createTypesFromModuleName(MODULE_NAME, mytationTypes);

export default {
  namespaced: true,
  state() {
    return {
      isSubmitting: false,
      currentUser: null,
      validationErrors: null,
      isLoggedIn: null
    };
  },
  mutations: {
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
    }
  },
  actions: {
    [actionsTypes.register]: async ({ commit }, credentials) => {
      try {
        commit(mytationTypes.registerStart);
        const { data } = await authApi.register(credentials);
        setItem('accessToken', data.user.token);
        commit(mytationTypes.registerSuccess, data.user);
      } catch (e) {
        commit(mytationTypes.registerFailure, e.response.data.errors);
        throw e;
      }
    }
  }
};