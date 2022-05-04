import { MutationTree } from "vuex";
import { EditArticleState, mytationTypes } from '@/store/modules/editArticle/types';

export const mutations: MutationTree<EditArticleState> = {
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
};