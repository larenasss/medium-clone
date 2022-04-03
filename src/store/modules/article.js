import articleApi from '@/api/article';

const MODULE_NAME = 'article';

export const mytationTypes = {
  getArticleStart: `[${MODULE_NAME}] getArticleStart`,
  getArticleSuccess: `[${MODULE_NAME}] getArticleSuccess`,
  getArticleFailure: `[${MODULE_NAME}] getArticleFailure`,
  deleteArticleStart: `[${MODULE_NAME}] deleteArticleStart`,
  deleteArticleSuccess: `[${MODULE_NAME}] deleteArticleSuccess`,
  deleteArticleFailure: `[${MODULE_NAME}] deleteArticleFailure`,
};

export const actionsTypes = {
  getArticle: `[${MODULE_NAME}] getArticle`,
  deleteArticle: `[${MODULE_NAME}] deleteArticle`
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