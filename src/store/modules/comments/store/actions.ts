import { RootState } from "@/store/types";
import { ActionTree } from "vuex";
import { CommentsState } from '@/store/modules/comments/types';
import commentsApi from '@/api/comments';
import { mytationTypes, actionsTypes } from '@/store/modules/comments/types';
import { Comment } from "@/entities/comment";

export const actions: ActionTree<CommentsState, RootState> = {
  [actionsTypes.getComments]: async ({ commit }, { slug }: {slug: string}) => {
    try {
      commit(mytationTypes.getCommentsStart);
      const comments: Comment = await commentsApi.getComments(slug);
      commit(mytationTypes.getCommentsSuccess, comments);
    } catch (e) {
      commit(mytationTypes.getCommentsFailure);
      throw e;
    }
  },
  [actionsTypes.addComment]: async ({ commit }, data: any) => {
    try {
      commit(mytationTypes.addCommentStart);
      const comment: Comment = await commentsApi.addComment(data);
      commit(mytationTypes.addCommentSuccess, comment);
    } catch (e: any) {
      commit(mytationTypes.addCommentFailure, e.response.data.errors);
      throw e;
    }
  },
  [actionsTypes.deleteComment]: async ({ commit }, data: any) => {
    try {
      commit(mytationTypes.deleteCommentStart);
      await commentsApi.deleteComment(data);
      commit(mytationTypes.deleteCommentSuccess, data);
    } catch (e) {
      commit(mytationTypes.deleteCommentFailure);
      throw e;
    }
  }
};