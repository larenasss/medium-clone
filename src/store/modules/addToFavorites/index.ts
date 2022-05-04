import { mutations } from '@/store/modules/addToFavorites/store/mutations';
import { actions } from '@/store/modules/addToFavorites/store/actions';
import { AddToFavoritesState } from '@/store/modules/addToFavorites/types';
import { RootState } from '@/store/types';
import { Module } from 'vuex';

export const addToFavorites: Module<AddToFavoritesState, RootState> = {
  mutations,
  actions
};