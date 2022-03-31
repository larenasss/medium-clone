import popularTags from '@/api/popularTags';
import { createTypesFromModuleName } from '@/helpers/typesStore';

const MODULE_NAME = 'popularTags';

const mytationTypes = {
  getPopularTagsStart: 'getPopularTagsStart',
  getPopularTagsSuccess: 'getPopularTagsSuccess',
  getPopularTagsFailure: 'getPopularTagsFailure',
};

const actionsTypes = {
  getPopularTags: 'getPopularTags'
};

export const actionsTypesExport = createTypesFromModuleName(MODULE_NAME, actionsTypes);
export const mytationTypesExport = createTypesFromModuleName(MODULE_NAME, mytationTypes);

export default {
  namespaced: true,
  state() {
    return {
      data: null,
      isLoading: false,
      error: null
    };
  },
  getters: {},
  mutations: {
    [mytationTypes.getPopularTagsStart](state) {
      state.isLoading = true;
      state.data = null;
    },
    [mytationTypes.getPopularTagsSuccess](state, payload) {
      state.isLoading = false;
      state.data = payload;
    },
    [mytationTypes.getPopularTagsFailure](state) {
      state.isLoading = false;
    }
  },
  actions: {
    [actionsTypes.getPopularTags]: async ({ commit }) => {
      try {
        commit(mytationTypes.getPopularTagsStart);
        const tags = await popularTags.getPopularTags();
        commit(mytationTypes.getPopularTagsSuccess, tags);
      } catch (e) {
        commit(mytationTypes.getPopularTagsFailure);
        throw e;
      }
    }
  }
};