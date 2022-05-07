
import { RootState, LoadingState } from '@/store/types';
import { mutations } from '@/store/modules/article/store/mutations';
import { actions } from '@/store/modules/article/store/actions';
import { Module } from 'vuex';
import { Article } from '@/entities/article';

const state: LoadingState<Article> = {
  data: null,
  isLoading: false,
  error: null
};

export const article: Module<LoadingState<Article>, RootState> = {
  state,
  mutations,
  actions,
};