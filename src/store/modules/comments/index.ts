import { Module } from 'vuex';
import { RootState, LoadingState } from '@/store/types';
import { mutations } from '@/store/modules/comments/store/mutations';
import { actions } from '@/store/modules/comments/store/actions';
import { Comment } from '@/entities/comment';

const state: LoadingState<Comment> = {
  data: null,
  isLoading: false,
  error: null
};

export const comments: Module<LoadingState<Comment>, RootState> = {
  state,
  mutations,
  actions
};

// validationErrors: null