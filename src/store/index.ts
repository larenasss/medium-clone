import { createStore, Store } from 'vuex';
import { feed } from '@/store/modules/feed';
import { popularTags } from '@/store/modules/popularTags';
import { article } from '@/store/modules/article/index';
import { createArticle } from '@/store/modules/createArticle';
import { editArticle } from '@/store/modules/editArticle';
import { settings } from '@/store/modules/settings';
import { addToFavorites } from '@/store/modules/addToFavorites/index';
import { userProfile } from '@/store/modules/userProfile/index';
import { comments } from '@/store/modules/comments';
import { RootState } from '@/store/types';
import { InjectionKey } from 'vue';

export const key: InjectionKey<Store<RootState>> = Symbol();

export const store = createStore<RootState>({
  mutations: {},
  actions: {},
  modules: {
    feed,
    popularTags,
    article,
    createArticle,
    editArticle,
    settings,
    addToFavorites,
    userProfile,
    comments
  }
});

