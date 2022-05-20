import { defineStore } from 'pinia';
import { Article } from '@/entities/article';
import articleApi from '@/api/article';
import { LoadingState } from '@/stores/types';
import { useUserProfileStore } from './userProfile';

export const useArticleStore = defineStore('article', {
  state: (): LoadingState<Article> => ({
    data: null,
    isLoading: false,
    error: null
  }),
  actions: {
    async getArticle({ slug }: {slug: string}) {
      try {
        this.$patch({
          isLoading: true,
          data: null
        });
        const article: Article = await articleApi.getArticle(slug);
        this.$patch({
          isLoading: false,
          data: article
        });
        // апдейтим usera для поддержания состояния подписки
        const storeUserProfile = useUserProfileStore();
        storeUserProfile.$patch({
          data: article.author
        });
      } catch (e) {
        this.$reset();
        throw e;
      }
    },
    async deleteArticle({ slug }: {slug: string}) {
      try {
        await articleApi.deleteArticle(slug);
      } catch (e) {
        console.error(e);
        throw e;
      }
    }
  }
});