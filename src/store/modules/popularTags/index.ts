import { Module } from 'vuex';
import { RootState, LoadingState } from '@/store/types';
import { mutations } from '@/store/modules/popularTags/store/mutations';
import { actions } from '@/store/modules/popularTags/store/actions';
import { Tag } from '@/entities/tag';

const state: LoadingState<Array<Tag>> = {
  data: null,
  isLoading: false,
  error: null
};

export const popularTags: Module<LoadingState<Array<Tag>>, RootState> ={
  state,
  mutations,
  actions
};