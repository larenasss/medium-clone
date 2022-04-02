import articleApi from '@/api/article';
import { createTypesFromModuleName } from '@/helpers/typesStore';

const MODULE_NAME = 'article';

const mytationTypes = {
  getArticleStart: 'getArticleStart',
  getArticleSuccess: 'getArticleSuccess',
  getArticleFailure: 'getArticleFailure',
};

const actionsTypes = {
  getArticle: 'getArticle'
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
    [mytationTypes.getArticleStart](state) {
      state.isLoading = true;
      state.data = null;
    },
    [mytationTypes.getArticleSuccess](state, payload) {
      state.isLoading = false;
      state.data = payload;
    },
    [mytationTypes.getArticleFailure](state) {
      state.isLoading = false;
    }
  },
  actions: {
    [actionsTypes.getArticle]: async ({ commit }, { slug }) => {
      try {
        commit(mytationTypes.getArticleStart);
        const article = await articleApi.getArticle(slug);
        commit(mytationTypes.getArticleSuccess, article);
      } catch (e) {
        commit(mytationTypes.getArticleFailure);
        throw e;
      }
    }
  }
};