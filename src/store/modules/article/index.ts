
import { RootState, LoadingState } from '@/store/types';
import { mutations } from '@/store/modules/article/store/mutations';
import { actions } from '@/store/modules/article/store/actions';
import { Module } from 'vuex';

const state: LoadingState = {
  data: null,
  isLoading: false,
  error: null
};

export const article: Module<LoadingState, RootState> = {
  state,
  mutations,
  actions,
};