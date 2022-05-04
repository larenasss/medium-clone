import { Module } from 'vuex';
import { RootState } from '@/store/types';
import { EditArticleState } from '@/store/modules/editArticle/types';
import { mutations } from '@/store/modules/editArticle/store/mutations';
import { actions } from '@/store/modules/editArticle/store/actions';

const state: EditArticleState = {
  isSubmitting: false,
  validationErrors: null,
  isLoading: false,
  article: null
};

export const editArticle: Module<EditArticleState, RootState> ={
  state,
  mutations,
  actions
};