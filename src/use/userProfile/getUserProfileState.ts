import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex';
import { key } from '@/store/index';

import { gettersTypes as authGettersTypes } from '@/store/modules/auth/types';

export function useGetUserProfileState(compareUser: any) {
  const store = useStore(key);

  const currentUser = computed(() => store.getters[authGettersTypes.currentUser]);

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