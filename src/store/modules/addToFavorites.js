import addToFavoritesApi from '@/api/addToFavorites';

const MODULE_NAME = 'addToFavorites';

export const mytationTypes = {
  addToFavoritesStart: `[${MODULE_NAME}] addToFavoritesStart`,
  addToFavoritesSuccess: `[${MODULE_NAME}] addToFavoritesSuccess`,
  addToFavoritesFailure: `[${MODULE_NAME}] addToFavoritesFailure`,
};

export const actionsTypes = {
  addToFavorites: `[${MODULE_NAME}] addToFavorites`
};

export default {
  mutations: {
    [mytationTypes.addToFavoritesStart]() {},
    [mytationTypes.addToFavoritesSuccess]() {},
    [mytationTypes.addToFavoritesFailure]() {},
  },
  actions: {
    [actionsTypes.addToFavorites]: async ({ commit }, { slug, isFavorited }) => {
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
  }
};