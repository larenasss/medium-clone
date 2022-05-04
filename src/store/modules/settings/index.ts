import { Module } from 'vuex';
import { RootState } from '@/store/types';
import { SettingsState } from '@/store/modules/settings/types';
import { mutations } from '@/store/modules/settings/store/mutations';

const state: SettingsState = {
  isSubmitting: false,
  validationErrors: null
};

export const settings: Module<SettingsState, RootState> = {
  state,
  mutations
};