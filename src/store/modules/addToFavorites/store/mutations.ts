import { MutationTree } from "vuex";
import { AddToFavoritesState, mytationTypes } from '@/store/modules/addToFavorites/types';

export const mutations: MutationTree<AddToFavoritesState> = {
  [mytationTypes.addToFavoritesStart]() {},
  [mytationTypes.addToFavoritesSuccess]() {},
  [mytationTypes.addToFavoritesFailure]() {}
};