export interface EditArticleState {
  isSubmitting: boolean,
  validationErrors: null,
  isLoading: boolean,
  article: null
}

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