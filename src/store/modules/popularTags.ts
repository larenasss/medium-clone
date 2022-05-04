import popularTags from '@/api/popularTags';

const MODULE_NAME = 'popularTags';

export const mytationTypes = {
  getPopularTagsStart: `[${MODULE_NAME}] getPopularTagsStart`,
  getPopularTagsSuccess: `[${MODULE_NAME}] getPopularTagsSuccess`,
  getPopularTagsFailure: `[${MODULE_NAME}] getPopularTagsFailure`,
};

export const actionsTypes = {
  getPopularTags: `[${MODULE_NAME}] getPopularTags`
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
    [mytationTypes.getPopularTagsStart](state: any) {
      state.isLoading = true;
      state.data = null;
    },
    [mytationTypes.getPopularTagsSuccess](state: any, payload: any) {
      state.isLoading = false;
      state.data = payload;
    },
    [mytationTypes.getPopularTagsFailure](state: any) {
      state.isLoading = false;
    }
  },
  actions: {
    [actionsTypes.getPopularTags]: async ({ commit }: {commit: Function}) => {
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