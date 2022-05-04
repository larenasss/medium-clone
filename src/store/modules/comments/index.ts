import { Module } from 'vuex';
import { RootState, LoadingState } from '@/store/types';
import { mutations } from '@/store/modules/comments/store/mutations';
import { actions } from '@/store/modules/comments/store/actions';

const state: LoadingState = {
  data: null,
  isLoading: false,
  error: null
};

export const comments: Module<LoadingState, RootState> = {
  state,
  mutations,
  actions
};

// validationErrors: null