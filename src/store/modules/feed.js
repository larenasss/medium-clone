import feedApi from '@/api/feed';
import { createTypesFromModuleName } from '@/helpers/typesStore';

const MODULE_NAME = 'feed';

const mytationTypes = {
  getFeedStart: 'getFeedStartStart',
  getFeedSuccess: 'getFeedStartSuccess',
  getFeedFailure: 'getFeedStartFailure',
};

const actionsTypes = {
  getFeed: 'getFeed'
};

export const actionsTypesExport = createTypesFromModuleName(MODULE_NAME, actionsTypes);
export const mytationTypesExport = createTypesFromModuleName(MODULE_NAME, mytationTypes);

export default {
  namespaced: true,
  state() {
    return {
      data: null,
      isLoading: false,
      errors: null
    };
  },
  getters: {},
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