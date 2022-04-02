import articleApi from '@/api/article';
import { createTypesFromModuleName } from '@/helpers/typesStore';

const MODULE_NAME = 'article';

const mytationTypes = {
  getArticleStart: 'getArticleStart',
  getArticleSuccess: 'getArticleSuccess',
  getArticleFailure: 'getArticleFailure',
  deleteArticleStart: 'deleteArticleStart',
  deleteArticleSuccess: 'deleteArticleSuccess',
  deleteArticleFailure: 'deleteArticleFailure',
};

const actionsTypes = {
  getArticle: 'getArticle',
  deleteArticle: 'deleteArticle'
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
    },
    [mytationTypes.deleteArticleStart]() {},
    [mytationTypes.deleteArticleSuccess]() {},
    [mytationTypes.deleteArticleFailure]() {}
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
    },
    [actionsTypes.deleteArticle]: async ({ commit }, { slug }) => {
      try {
        commit(mytationTypes.deleteArticleStart);
        await articleApi.deleteArticle(slug);
        commit(mytationTypes.deleteArticleSuccess);
      } catch (e) {
        commit(mytationTypes.deleteArticleFailure);
        throw e;
      }
    }
  }
};