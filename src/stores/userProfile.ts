import { defineStore } from 'pinia';
import { UserAuthor, UserProfile } from '@/entities/user';
import userProfileApi from '@/api/userProfile';
import { LoadingState } from '@/stores/types';
import { AuthState, useAuthUserStore } from './auth';
import { setItem } from '@/helpers/persistanceStorage';

export const useUserProfileStore = defineStore('userProfile', {
  state: (): LoadingState<UserAuthor> => ({
    data: null,
    isLoading: false,
    error: null
  }),
  actions: {
    async register(credentials: UserProfile): Promise<void> {
      const authStore = useAuthUserStore();
      try {
        this.$patch({
          validationErrors: null,
          isSubmitting: true
        } as AuthState);

        const user = await userProfileApi.register(credentials);
        setItem('accessToken', user.token);
        authStore.updateCurrentUser(user);
      } catch (e: any) {
        authStore.$patch({
          isSubmitting: false,
          validationErrors: e.response.data.errors
        });
        throw e;
      }
    },
    async getUserProfile({ userSlug }: {userSlug: string}) {
      try {
        this.$patch({
          isLoading: true,
          data: null
        });
        const user: UserAuthor = await userProfileApi.getUserProfile(userSlug);
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
        const user = isFallow
          ? await userProfileApi.removeFromFallow(slug)
          : await userProfileApi.addToFallow(slug);
        this.$patch({
          data: user
        });
      } catch (e) {
        console.error(e);
        throw e;
      }
    }
  }
});