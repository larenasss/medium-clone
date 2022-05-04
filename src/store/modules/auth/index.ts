
import { AuthState } from '@/store/modules/auth/types';
import { mutations } from '@/store/modules/auth/store/mutations';
import { actions } from '@/store/modules/auth/store/actions';
import { getters } from '@/store/modules/auth/store/getters';
import { Module } from 'vuex';
import { RootState } from '@/store/types';

const state: AuthState = {
  isSubmitting: false,
  isLoading: false,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null
};

export const auth: Module<AuthState, RootState> = {
  state,
  getters,
  mutations,
  actions
};