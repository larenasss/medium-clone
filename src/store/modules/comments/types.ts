import { LoadingState } from '@/store/types';

export interface CommentsState extends LoadingState { }

const MODULE_NAME = 'comments';

export const mytationTypes = {
  getCommentsStart: `[${MODULE_NAME}] getCommentsStart`,
  getCommentsSuccess: `[${MODULE_NAME}] getCommentsSuccess`,
  getCommentsFailure: `[${MODULE_NAME}] getCommentsFailure`,

  deleteCommentStart: `[${MODULE_NAME}] deleteCommentStart`,
  deleteCommentSuccess: `[${MODULE_NAME}] deleteCommentSuccess`,
  deleteCommentFailure: `[${MODULE_NAME}] deleteCommentFailure`,

  addCommentStart: `[${MODULE_NAME}] addCommentStart`,
  addCommentSuccess: `[${MODULE_NAME}] addCommentSuccess`,
  addCommentFailure: `[${MODULE_NAME}] addCommentFailure`,
};

export const actionsTypes = {
  getComments: `[${MODULE_NAME}] getComments`,
  deleteComment: `[${MODULE_NAME}] deleteComment`,
  addComment: `[${MODULE_NAME}] addComment`,
};