import { defineStore } from "pinia";
import addToFavoritesApi from '@/api/addToFavorites';

export const useAddToFavoritesStore = defineStore('addToFavorites', {
  actions: {
    async addToFavorites({ slug, isFavorited }: {slug: string, isFavorited: boolean}) {
      try {
        isFavorited
          ? await addToFavoritesApi.removeFromFavorites(slug)
          : await addToFavoritesApi.addToFavorites(slug);
      } catch (e) {
        console.error(e);
        throw e;
      }
    }
  }
});