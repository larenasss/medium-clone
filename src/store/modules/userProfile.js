import userProfileApi from '@/api/userProfile';

const MODULE_NAME = 'userProfile';

export const mytationTypes = {
  getUserProfileStart: `[${MODULE_NAME}] getUserProfileStart`,
  getUserProfileSuccess: `[${MODULE_NAME}] getUserProfileSuccess`,
  getUserProfileFailure: `[${MODULE_NAME}] getUserProfileFailure`,
};

export const actionsTypes = {
  getUserProfile: `[${MODULE_NAME}] getUserProfile`
};

export default {
  state() {
    return {
      data: null,
      isLoading: false,
      error: null
    };
  },
  mutations: {
    [mytationTypes.getUserProfileStart](state) {
      state.isLoading = true;
      state.data = null;
    },
    [mytationTypes.getUserProfileSuccess](state, payload) {
      state.isLoading = false;
      state.data = payload;
    },
    [mytationTypes.getUserProfileFailure](state) {
      state.isLoading = false;
    }
  },
  actions: {
    [actionsTypes.getUserProfile]: async ({ commit }, { slug }) => {
      try {
        commit(mytationTypes.getUserProfileStart);
        const user = await userProfileApi.getUserProfile(slug);
        commit(mytationTypes.getUserProfileSuccess, user);
      } catch (e) {
        commit(mytationTypes.getUserProfileFailure);
        throw e;
      }
    }
  }
};