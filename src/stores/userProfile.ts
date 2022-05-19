import { defineStore } from 'pinia';
import { UserProfile } from '@/entities/user';
import userProfileApi from '@/api/userProfile';
import { LoadingState } from '@/stores/types';
import { useArticleStore } from './article';

export const useUserProfileStore = defineStore('userProfile', {
  state: (): LoadingState<UserProfile> => ({
    data: null,
    isLoading: false,
    error: null
  }),
  actions: {
    async getUserProfile({ slug }: {slug: string}) {
      try {
        this.$patch({
          isLoading: true,
          data: null
        });
        const user: UserProfile = await userProfileApi.getUserProfile(slug);
        this.$patch({
          isLoading: true,
          data: user
        });
      } catch (e) {
        this.$reset();
        throw e;
      }
    },
    async addToFallow ({ slug, isFallow }: { slug: string, isFallow: boolean }) {
      try {
        isFallow
          ? await userProfileApi.removeFromFallow(slug)
          : await userProfileApi.addToFallow(slug);
        const articleStore = useArticleStore();
        articleStore.updateFollowing(isFallow);
      } catch (e) {
        console.error(e);
        throw e;
      }
    }
  }
});