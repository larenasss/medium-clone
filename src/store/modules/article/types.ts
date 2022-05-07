import { Article } from '@/entities/article';
import { LoadingState } from '@/store/types';

export interface ArticleState extends LoadingState<Article> { }

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