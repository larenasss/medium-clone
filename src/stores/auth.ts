import { defineStore } from 'pinia';
import { UserProfile } from '@/entities/user';
import { setItem } from '@/helpers/persistanceStorage';

import authApi from '@/api/auth';
import { useSettingsStore } from './settings';

export interface AuthState {
  isSubmitting: boolean,
  isLoading: boolean,
  currentUser: UserProfile | null,
  validationErrors: null | any,
  isLoggedIn: boolean | null
}

export const useAuthUserStore = defineStore('auth', {
  state: (): AuthState => ({
    isSubmitting: false,
    isLoading: false,
    currentUser: null,
    validationErrors: null,
    isLoggedIn: null
  }),
  getters: {
    isAnonymous: (state): boolean => state.isLoggedIn === null
  },
  actions: {
    async register(credentials: UserProfile): Promise<void> {
       try {
        this.$patch({
          validationErrors: null,
          isSubmitting: true
        } as AuthState);

        const user = await authApi.register(credentials);
        setItem('accessToken', user.token);
        this.updateCurrentUser(user);
      } catch (e: any) {
        this.$patch({
          isSubmitting: false,
          validationErrors: e.response.data.errors
        });
        throw e;
      }
    },
    async login(credentials: UserProfile): Promise<void> {
      try {
        this.$patch({
          validationErrors: null,
          isSubmitting: true
        } as AuthState);

        const user = await authApi.login(credentials);
        setItem('accessToken', user.token);
        this.updateCurrentUser(user);
      } catch (e: any) {
        this.$patch({
          isSubmitting: false,
          validationErrors: e.response.data.errors
        });
        throw e;
      }
    },
    async logout(): Promise<void> {
      try {
        setItem('accessToken', '');
        this.$reset();
      } catch (e) {
        console.log(e);
        throw e;
      }
    },
    async getCurrentUser(): Promise<void> {
      try {
        this.$patch({
          isLoading: true
        });
        const user = await authApi.getCurrentUser();
        this.updateCurrentUser(user);
      } catch (e) {
        this.$reset();
        throw e;
      }
    },
    async updateCurrentUserProfile(currentUser: UserProfile): Promise<void> {
      const settingsStore = useSettingsStore();
      try {
        settingsStore.$patch({
          isSubmitting: true,
          validationErrors: null
        });
        const user = await authApi.updateCurrentUserProfile(currentUser);
        this.updateCurrentUser(user);
        settingsStore.$patch({
          isSubmitting: false,
        });
      } catch (e: any) {
        settingsStore.$patch({
          isSubmitting: false,
          validationErrors: e.response.data.errors
        });
        this.$patch({
          isSubmitting: false,
          validationErrors: e.response.data.errors
        });
        throw e;
      }
    },
    updateCurrentUser(user: UserProfile) {
      this.$patch({
        currentUser: user,
        isLoading: false,
        isLoggedIn: true,
      });
    }
  }
});