import { Module } from 'vuex';
import { RootState, LoadingState } from '@/store/types';
import { mutations } from '@/store/modules/userProfile/store/mutations';
import { actions } from '@/store/modules/userProfile/store/actions';

const state: LoadingState = {
  data: null,
  isLoading: false,
  error: null
};

export const userProfile: Module<LoadingState, RootState> = {
  state,
  mutations,
  actions,
};