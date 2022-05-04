import { Module } from 'vuex';
import { RootState, LoadingState } from '@/store/types';
import { mutations } from '@/store/modules/popularTags/store/mutations';
import { actions } from '@/store/modules/popularTags/store/actions';

const state: LoadingState = {
  data: null,
  isLoading: false,
  error: null
};

export const popularTags: Module<LoadingState, RootState> ={
  state,
  mutations,
  actions
};