import articleApi from '@/api/article';

const MODULE_NAME = 'createArticle';

export const mytationTypes = {
  createArticleStart: `[${MODULE_NAME}] createArticleStart`,
  createArticleSuccess: `[${MODULE_NAME}] createArticleSuccess`,
  createArticleFailure: `[${MODULE_NAME}] createArticleFailure`,
};

export const actionsTypes = {
  createArticle: `[${MODULE_NAME}] createArticle`,
};

export default {
  state() {
    return {
      isSubmitting: false,
      validationErrors: null
    };
  },
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