import { defineStore } from 'pinia';
import articleApi from '@/api/article';
import { Article } from '@/entities/article';

interface CreateArticleState {
  isSubmitting: boolean,
  validationErrors: null
}

export const useCreateArticleStore = defineStore('createArticle', {
  state: (): CreateArticleState => ({
    isSubmitting: false,
    validationErrors: null
  }),
  actions: {
    async createArticle(articleInput: Article) {
      try {
        this.$patch({
          isSubmitting: true
        });
        const article = await articleApi.createArticle(articleInput);
        this.$reset();
        return article;
      } catch (e: any) {
        this.$patch({
          isSubmitting: false,
          validationErrors: e.response.data.errors
        });
        throw e;
      }
    }
  }
});