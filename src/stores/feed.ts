import { defineStore } from 'pinia';
import feedApi from '@/api/feed';
import { LoadingState } from '@/stores/types';
import { Feed } from '@/entities/feed';

export const useFeedStore = defineStore('feed', {
  state: (): LoadingState<Feed> => ({
    data: null,
    isLoading: false,
    error: null
  }),
  actions: {
    async getFeed({ apiUrl }: {apiUrl: string}) {
      try {
        this.$patch({
          isLoading: true,
          data: null
        });

        const { data }: { data: Feed } = await feedApi.getFeed(apiUrl);

        this.$patch({
          isLoading: false,
          data: data
        });
      } catch (e) {
        this.$reset();
        throw e;
      }
    }
  }
});