export interface CreateArticleState {
  isSubmitting: boolean,
  validationErrors: null
}

const MODULE_NAME = 'createArticle';

export const mytationTypes = {
  createArticleStart: `[${MODULE_NAME}] createArticleStart`,
  createArticleSuccess: `[${MODULE_NAME}] createArticleSuccess`,
  createArticleFailure: `[${MODULE_NAME}] createArticleFailure`,
};

export const actionsTypes = {
  createArticle: `[${MODULE_NAME}] createArticle`,
};