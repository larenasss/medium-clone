import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex';

import { gettersTypes as authGettersTypes } from '@/store/modules/auth';

export function useGetUserProfileState(compareUser) {
  const store = useStore();

  const currentUser = computed(() => store.getters[authGettersTypes.currentUser]);

  const isCurrentUserProfile = computed(() => {
    if (!currentUser.value || !compareUser.value) {
      return false;
    }
    return currentUser.value.username === compareUser.value.username;
  });

  return {
    currentUser,
    isCurrentUserProfile
  };
}