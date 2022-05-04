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
    [mytationTypes.updateArticleStart](state: any) {
      state.isSubmitting = true;
    },
    [mytationTypes.updateArticleSuccess](state: any) {
      state.isSubmitting = false;
    },
    [mytationTypes.updateArticleFailure](state: any, payload: any) {
      state.isSubmitting = false;
      state.validationErrors = payload;
    },
    [mytationTypes.getArticleStart](state: any) {
      state.isLoading = true;
    },
    [mytationTypes.getArticleSuccess](state: any, payload: any) {
      state.isLoading = false;
      state.article = payload;
    },
    [mytationTypes.getArticleFailure](state: any) {
      state.isLoading = false;
    },
  },
  actions: {
    [actionsTypes.updateArticle]: async ({ commit }: {commit: Function}, { slug, articleInput }: {slug: string, articleInput: any}) => {
      try {
        commit(mytationTypes.updateArticleStart);
        const article = await articleApi.updateArticle(slug, articleInput);
        commit(mytationTypes.updateArticleSuccess, article);
        return article;
      } catch (e: any) {
        commit(mytationTypes.updateArticleFailure, e.response.data.errors);
        throw e;
      }
    },
    [actionsTypes.getArticle]: async ({ commit }: {commit: Function}, { slug }: { slug: string }) => {
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