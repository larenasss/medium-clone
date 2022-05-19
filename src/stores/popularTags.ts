import { defineStore } from 'pinia';
import popularTags from '@/api/popularTags';
import { LoadingState } from '@/stores/types';
import { Tag } from '@/entities/tag';

export const usePopularTagsStore = defineStore('popularTags', {
  state: (): LoadingState<Array<Tag>> => ({
    data: null,
    isLoading: false,
    error: null
  }),
  actions: {
    async getPopularTags() {
      try {
        this.$patch({
          isLoading: true,
          data: null
        });
        const tags: Array<Tag> = await popularTags.getPopularTags();
        this.$patch({
          isLoading: false,
          data: tags
        });
      } catch (e) {
        this.$reset();
        throw e;
      }
    }
  }
});