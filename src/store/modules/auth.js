import authApi from '@/api/auth';

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
    registerStart(state) {
      state.isSubmitting = true;
      state.validationErrors = null;
    },
    registerSuccess(state, payload) {
      state.isSubmitting = false;
      state.currentUser = payload;
      state.isLoggedIn = true;
    },
    registerFailure(state, payload) {
      state.isSubmitting = false;
      state.validationErrors = payload;
    }
  },
  actions: {
    register: async ({ commit }, credentials) => {
      try {
        commit('registerStart');
        const { data } = await authApi.register(credentials);
        commit('registerSuccess', data.user);
      } catch (e) {
        commit('registerFailure', e.response.data.errors);
        throw e;
      }
    }
  }
};