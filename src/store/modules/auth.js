import authApi from '@/api/auth';
import { setItem } from '@/helpers/persistanceStorage';

import { createTypesFromModuleName } from '@/helpers/typesStore';

const MODULE_NAME = 'auth';

const gettersTypes = {
  currentUser: 'currentUser',
  isLoggedIn: 'isLoggedIn',
  isAnonymous: 'isAnonymous'
};

const mytationTypes = {
  registerStart: 'registerStart',
  registerSuccess: 'registerSuccess',
  registerFailure: 'registerFailure',

  loginStart: 'loginStart',
  loginSuccess: 'loginSuccess',
  loginFailure: 'loginFailure',

  getCurrentUserStart: 'getCurrentUserStart',
  getCurrentUserSuccess: 'getCurrentUserSuccess',
  getCurrentUserFailure: 'getCurrentUserFailure',

  updateCurrentUserStart: 'updateCurrentUserStart',
  updateCurrentUserSuccess: 'updateCurrentUserSuccess',
  updateCurrentUserFailure: 'updateCurrentUserFailure',

  logout: 'logout'
};

const actionsTypes = {
  register: 'register',
  login: 'login',
  getCurrentUser: 'getCurrentUser',
  updateCurrentUser: 'updateCurrentUser',
  logout: 'logout'
};

export const actionsTypesExport = createTypesFromModuleName(MODULE_NAME, actionsTypes);
export const mytationTypesExport = createTypesFromModuleName(MODULE_NAME, mytationTypes);
export const gettersTypesExport = createTypesFromModuleName(MODULE_NAME, gettersTypes);

export default {
  namespaced: true,
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
        setItem('acceessToken', '');
        commit(mytationTypes.logout);
      } catch (e) {
        console.log(e);
        throw e;
      }
    }
  }
};