import articleApi from '@/api/article';

const MODULE_NAME = 'editArticle';

export const mytationTypes = {
  updateArticleStart: `[${MODULE_NAME}] updateArticleStart`,
  updateArticleSuccess: `[${MODULE_NAME}] updateArticleSuccess`,
  updateArticleFailure: `[${MODULE_NAME}] updateArticleFailure`,

  getArticleStart: `[${MODULE_NAME}] getArticleStart`,
  getArticleSuccess: `[${MODULE_NAME}] getArticleSuccess`,
  getArticleFailure: `[${MODULE_NAME}] getArticleFailure`,
};

export const actionsTypes = {
  updateArticle: `[${MODULE_NAME}] updateArticle`,
  getArticle: `[${MODULE_NAME}] getArticle`,
};

export default {
  state() {
    return {
      isSubmitting: false,
      validationErrors: null,
      isLoading: false,
      article: null
    };
  },
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