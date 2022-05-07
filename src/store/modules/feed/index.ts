import { Module } from 'vuex';
import { RootState, LoadingState } from '@/store/types';
import { mutations } from '@/store/modules/feed/store/mutations';
import { actions } from '@/store/modules/feed/store/actions';
import { Feed } from '@/entities/feed';

const state: LoadingState<Feed> = {
  data: null,
  isLoading: false,
  error: null
};

export const feed: Module<LoadingState<Feed>, RootState> = {
  state,
  mutations,
  actions
};