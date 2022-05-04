import { Module } from 'vuex';
import { RootState, LoadingState } from '@/store/types';
import { mutations } from '@/store/modules/feed/store/mutations';
import { actions } from '@/store/modules/feed/store/actions';

const state: LoadingState = {
  data: null,
  isLoading: false,
  error: null
};

export const feed: Module<LoadingState, RootState> = {
  state,
  mutations,
  actions
};