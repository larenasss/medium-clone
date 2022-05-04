import { MutationTree } from "vuex";
import { ArticleState, mytationTypes } from '@/store/modules/article/types';

export const mutations: MutationTree<ArticleState> = {
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
};