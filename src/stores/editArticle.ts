import { defineStore } from 'pinia';
import articleApi from '@/api/article';
import { Article } from '@/entities/article';

interface EditArticleState {
  isSubmitting: boolean;
  validationErrors: null;
  isLoading: boolean;
  article: Article | null;
}

export const useEditArticleStore = defineStore('editArticle', {
  state: (): EditArticleState => ({
    isSubmitting: false,
    validationErrors: null,
    isLoading: false,
    article: null
  }),
  actions: {
    async updateArticle({ slug, articleInput }: {slug: string, articleInput: Article}) {
      try {
        this.$patch({
          isSubmitting: true
        });
        const article = await articleApi.updateArticle(slug, articleInput);
        this.$patch({
          isSubmitting: false
        });
        return article;
      } catch (e: any) {
        this.$patch({
          isSubmitting: false,
          validationErrors: e.response.data.errors
        });
        throw e;
      }
    },
    async getArticle({ slug }: { slug: string }) {
      try {
        this.$patch({
          isLoading: true
        });
        const article = await articleApi.getArticle(slug);
        this.$patch({
          isLoading: false,
          article: article
        });
        return article;
      } catch (e) {
        this.$patch({
          isLoading: false
        });
        throw e;
      }
    }
  }
});