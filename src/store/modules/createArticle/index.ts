import { Module } from 'vuex';
import { RootState } from '@/store/types';
import { CreateArticleState } from '@/store/modules/createArticle/types';
import { mutations } from '@/store/modules/createArticle/store/mutations';
import { actions } from '@/store/modules/createArticle/store/actions';

const state: CreateArticleState = {
  isSubmitting: false,
  validationErrors: null
};

export const createArticle: Module<CreateArticleState, RootState> = {
  state,
  mutations,
  actions
};