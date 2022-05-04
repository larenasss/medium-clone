import { MutationTree } from "vuex";
import { CommentsState, mytationTypes } from '@/store/modules/comments/types';

export const mutations: MutationTree<CommentsState> = {
  [mytationTypes.getCommentsStart](state) {
      state.isLoading = true;
      state.data = null;
    },
    [mytationTypes.getCommentsSuccess](state, payload) {
      state.isLoading = false;
      state.data = payload.sort((a: any, b: any): any => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
    },
    [mytationTypes.getCommentsFailure](state) {
      state.isLoading = false;
    },
    [mytationTypes.deleteCommentStart]() {},
    [mytationTypes.deleteCommentSuccess](state: any, { slugComment }: {slugComment: string}) {
      state.data = state.data.filter((x: any) => x.id != slugComment);
    },
    [mytationTypes.deleteCommentFailure]() {},
    [mytationTypes.addCommentStart]() {},
    [mytationTypes.addCommentSuccess](state: any, payload) {
      state.data.unshift(payload);
    },
    [mytationTypes.addCommentFailure](state, payload) {
      state.error = payload;
    },
};