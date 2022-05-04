import { MutationTree } from "vuex";
import { CreateArticleState, mytationTypes } from '@/store/modules/createArticle/types';

export const mutations: MutationTree<CreateArticleState> = {
  [mytationTypes.createArticleStart](state) {
      state.isSubmitting = true;
    },
    [mytationTypes.createArticleSuccess](state) {
      state.isSubmitting = false;
    },
    [mytationTypes.createArticleFailure](state, payload) {
      state.isSubmitting = false;
      state.validationErrors = payload;
    },
};