import { createStore, Store } from 'vuex';
import { feed } from '@/store/modules/feed';
import { popularTags } from '@/store/modules/popularTags';
import { createArticle } from '@/store/modules/createArticle';
import { editArticle } from '@/store/modules/editArticle';
import { RootState } from '@/store/types';
import { InjectionKey } from 'vue';

export const key: InjectionKey<Store<RootState>> = Symbol();

export const store = createStore<RootState>({
  mutations: {},
  actions: {},
  modules: {
    feed,
    popularTags,
    createArticle,
    editArticle,
  }
});

