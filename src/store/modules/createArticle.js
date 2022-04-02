import articleApi from '@/api/article';
import { createTypesFromModuleName } from '@/helpers/typesStore';

const MODULE_NAME = 'createArticle';

const mytationTypes = {
  createArticleStart: 'createArticleStart',
  createArticleSuccess: 'createArticleSuccess',
  createArticleFailure: 'createArticleFailure',
};

const actionsTypes = {
  createArticle: 'createArticle',
};

export const actionsTypesExport = createTypesFromModuleName(MODULE_NAME, actionsTypes);
export const mytationTypesExport = createTypesFromModuleName(MODULE_NAME, mytationTypes);

export default {
  namespaced: true,
  state() {
    return {
      isSubmitting: false,
      validationErrors: null
    };
  },
  getters: {},
  mutations: {
    [mytationTypes.createArticleStart](state) {
      state.isSubmitting = true;
    },
    [mytationTypes.createArticleSuccess](state) {
      state.isSubmitting = false;
    },
    [mytationTypes.createArticleFailure](state, payload) {
      state.isSubmitting = false;
      state.validationErrors = payload;
    },
  },
  actions: {
    [actionsTypes.createArticle]: async ({ commit }, { articleInput }) => {
      try {
        console.log(articleInput);
        commit(mytationTypes.createArticleStart);
        const article = await articleApi.createArticle(articleInput);
        commit(mytationTypes.createArticleSuccess);
        return article;
      } catch (e) {
        commit(mytationTypes.createArticleFailure, e.response.data.errors);
        throw e;
      }
    }
  }
};