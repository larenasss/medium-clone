import { Module } from 'vuex';
import { RootState, LoadingState } from '@/store/types';
import { mutations } from '@/store/modules/userProfile/store/mutations';
import { actions } from '@/store/modules/userProfile/store/actions';
import { UserProfile } from '@/entities/user';

const state: LoadingState<UserProfile> = {
  data: null,
  isLoading: false,
  error: null
};

export const userProfile: Module<LoadingState<UserProfile>, RootState> = {
  state,
  mutations,
  actions,
};