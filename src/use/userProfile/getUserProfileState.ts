import { computed, ComputedRef } from '@vue/runtime-core';
import { useStore } from 'vuex';
import { key } from '@/store/index';

import { gettersTypes as authGettersTypes } from '@/store/modules/auth/types';
import { User, UserProfile } from '@/entities/user';

export function useGetUserProfileState<T extends ComputedRef<User | null>>(compareUser: T) {
  const store = useStore(key);

  const currentUser = computed<UserProfile>(() => store.getters[authGettersTypes.currentUser]);

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