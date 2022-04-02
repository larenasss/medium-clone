import articleApi from '@/api/article';
import { createTypesFromModuleName } from '@/helpers/typesStore';

const MODULE_NAME = 'editArticle';

const mytationTypes = {
  updateArticleStart: 'updateArticleStart',
  updateArticleSuccess: 'updateArticleSuccess',
  updateArticleFailure: 'updateArticleFailure',

  getArticleStart: 'getArticleStart',
  getArticleSuccess: 'getArticleSuccess',
  getArticleFailure: 'getArticleFailure',
};

const actionsTypes = {
  updateArticle: 'updateArticle',
  getArticle: 'getArticle',
};

export const actionsTypesExport = createTypesFromModuleName(MODULE_NAME, actionsTypes);
export const mytationTypesExport = createTypesFromModuleName(MODULE_NAME, mytationTypes);

export default {
  namespaced: true,
  state() {
    return {
      isSubmitting: false,
      validationErrors: null,
      isLoading: false,
      article: null
    };
  },
  getters: {},
  mutations: {
    [mytationTypes.updateArticleStart](state) {
      state.isSubmitting = true;
    },
    [mytationTypes.updateArticleSuccess](state) {
      state.isSubmitting = false;
    },
    [mytationTypes.updateArticleFailure](state, payload) {
      state.isSubmitting = false;
      state.validationErrors = payload;
    },
    [mytationTypes.getArticleStart](state) {
      state.isLoading = true;
    },
    [mytationTypes.getArticleSuccess](state, payload) {
      state.isLoading = false;
      state.article = payload;
    },
    [mytationTypes.getArticleFailure](state) {
      state.isLoading = false;
    },
  },
  actions: {
    [actionsTypes.updateArticle]: async ({ commit }, { slug, articleInput }) => {
      try {
        commit(mytationTypes.updateArticleStart);
        const article = await articleApi.updateArticle(slug, articleInput);
        commit(mytationTypes.updateArticleSuccess, article);
        return article;
      } catch (e) {
        commit(mytationTypes.createArticleFailure, e.response.data.errors);
        throw e;
      }
    },
    [actionsTypes.getArticle]: async ({ commit }, { slug }) => {
      try {
        commit(mytationTypes.getArticleStart);
        const article = await articleApi.getArticle(slug);
        commit(mytationTypes.getArticleSuccess, article);
        return article;
      } catch (e) {
        commit(mytationTypes.getArticleFailure);
        throw e;
      }
    }
  }
};