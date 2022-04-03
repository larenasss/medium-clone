import feedApi from '@/api/feed';

const MODULE_NAME = 'feed';

export const mytationTypes = {
  getFeedStart: `[${MODULE_NAME}] getFeedStart`,
  getFeedSuccess: `[${MODULE_NAME}] getFeedSuccess`,
  getFeedFailure: `[${MODULE_NAME}] getFeedFailure`,
};

export const actionsTypes = {
  getFeed: `[${MODULE_NAME}] getFeed`
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
    [mytationTypes.getFeedStart](state) {
      state.isLoading = true;
      state.data = null;
    },
    [mytationTypes.getFeedSuccess](state, payload) {
      state.isLoading = false;
      state.data = payload;
    },
    [mytationTypes.getFeedFailure](state) {
      state.isLoading = false;
    }
  },
  actions: {
    [actionsTypes.getFeed]: async ({ commit }, { apiUrl }) => {
      try {
        commit(mytationTypes.getFeedStart);
        const { data } = await feedApi.getFeed(apiUrl);
        commit(mytationTypes.getFeedSuccess, data);
      } catch (e) {
        commit(mytationTypes.getFeedFailure);
        throw e;
      }
    }
  }
};