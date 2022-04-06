import authApi from '@/api/auth';
import { setItem } from '@/helpers/persistanceStorage';

const MODULE_NAME = 'auth';

export const gettersTypes = {
  currentUser: `[${MODULE_NAME}] currentUser`,
  isLoggedIn: `[${MODULE_NAME}] isLoggedIn`,
  isAnonymous: `[${MODULE_NAME}] isAnonymous`
};

export const mytationTypes = {
  registerStart: `[${MODULE_NAME}] registerStart`,
  registerSuccess: `[${MODULE_NAME}] registerSuccess`,
  registerFailure: `[${MODULE_NAME}] registerFailure`,

  loginStart: `[${MODULE_NAME}] loginStart`,
  loginSuccess: `[${MODULE_NAME}] loginSuccess`,
  loginFailure: `[${MODULE_NAME}] loginFailure`,

  getCurrentUserStart: `[${MODULE_NAME}] getCurrentUserStart`,
  getCurrentUserSuccess: `[${MODULE_NAME}] getCurrentUserSuccess`,
  getCurrentUserFailure: `[${MODULE_NAME}] getCurrentUserFailure`,

  updateCurrentUserStart: `[${MODULE_NAME}] updateCurrentUserStart`,
  updateCurrentUserSuccess: `[${MODULE_NAME}] updateCurrentUserSuccess`,
  updateCurrentUserFailure: `[${MODULE_NAME}] updateCurrentUserFailure`,

  logout: `[${MODULE_NAME}] logout`
};

export const actionsTypes = {
  register: `[${MODULE_NAME}] register`,
  login: `[${MODULE_NAME}] login`,
  getCurrentUser: `[${MODULE_NAME}] getCurrentUser`,
  updateCurrentUser: `[${MODULE_NAME}] updateCurreUser`,
  logout: `[${MODULE_NAME}] logout`
};

export default {
  state() {
    return {
      isSubmitting: false,
      isLoading: false,
      currentUser: null,
      validationErrors: null,
      isLoggedIn: null
    };
  },
  getters: {
    [gettersTypes.currentUser]: state => state.currentUser,
    [gettersTypes.isLoggedIn]: state => Boolean(state.isLoggedIn),
    [gettersTypes.isAnonymous]: state => state.isLoggedIn === false
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
    },
    [actionsTypes.login]: async ({ commit }, credentials) => {
      try {
        commit(mytationTypes.loginStart);
        const { data } = await authApi.login(credentials);
        setItem('accessToken', data.user.token);
        commit(mytationTypes.loginSuccess, data.user);
      } catch (e) {
        commit(mytationTypes.loginFailure, e.response.data.errors);
        throw e;
      }
    },
    [actionsTypes.getCurrentUser]: async ({ commit }) => {
      try {
        commit(mytationTypes.getCurrentUserStart);
        const { data } = await authApi.getCurrentUser();
        commit(mytationTypes.getCurrentUserSuccess, data.user);
      } catch (e) {
        commit(mytationTypes.getCurrentUserFailure);
        throw e;
      }
    },
    [actionsTypes.updateCurrentUser]: async ({ commit }, { currentUserInput }) => {
      try {
        commit(mytationTypes.updateCurrentUserStart);
        const user = await authApi.updateCurrentUser(currentUserInput);
        commit(mytationTypes.updateCurrentUserSuccess, user);
      } catch (e) {
        console.dir(e);
        commit(mytationTypes.updateCurrentUserFailure, e.response.data.errors);
        throw e;
      }
    },
    [actionsTypes.logout]: async ({ commit }) => {
      try {
        setItem('accessToken', '');
        commit(mytationTypes.logout);
      } catch (e) {
        console.log(e);
        throw e;
      }
    }
  }
};