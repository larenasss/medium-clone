import { computed, ComputedRef } from '@vue/runtime-core';
import { useAuthUserStore } from '@/stores/auth';

import { User } from '@/entities/user';

export function useGetUserProfileState<T extends ComputedRef<User | null>>(compareUser: T) {
  const store = useAuthUserStore();

  const currentUser = computed(() => store.currentUser);

  const isCurrentUserProfile = computed(() => {
    if (!compareUser || !currentUser.value || !compareUser.value) {
      return false;
    }
    return currentUser.value.username === compareUser.value.username;
  });

  return {
    currentUser,
    isCurrentUserProfile
  };
}