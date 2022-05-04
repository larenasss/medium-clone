import { RootState } from "@/store/types";
import { ActionTree } from "vuex";
import { AddToFavoritesState } from '@/store/modules/addToFavorites/types';
import addToFavoritesApi from '@/api/addToFavorites';
import { mytationTypes, actionsTypes } from '@/store/modules/addToFavorites/types';

export const actions: ActionTree<AddToFavoritesState, RootState> = {
  [actionsTypes.addToFavorites]: async ({ commit }, { slug, isFavorited }: {slug: string, isFavorited: boolean}) => {
    try {
      commit(mytationTypes.addToFavoritesStart);
      const article = isFavorited
        ? await addToFavoritesApi.removeFromFavorites(slug)
        : await addToFavoritesApi.addToFavorites(slug);
      commit(mytationTypes.addToFavoritesSuccess, article);
    } catch (e) {
      commit(mytationTypes.addToFavoritesFailure);
      throw e;
    }
  }
};