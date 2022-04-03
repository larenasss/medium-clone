import { createStore, createLogger } from 'vuex';
import auth from '@/store/modules/auth';
import feed from '@/store/modules/feed';
import popularTags from '@/store/modules/popularTags';
import article from '@/store/modules/article';
import createArticle from '@/store/modules/createArticle';
import editArticle from '@/store/modules/editArticle';
import settings from '@/store/modules/settings';
import addToFavorites from '@/store/modules/addToFavorites';

const plugins = [];

if (process.env.NODE_ENV === 'development') {
  plugins.push(createLogger());
}

export default createStore({
  plugins,
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    feed,
    popularTags,
    article,
    createArticle,
    editArticle,
    settings,
    addToFavorites
  }
});
