import { useStore } from 'vuex';
import { computed } from '@vue/runtime-core';

export function useGetStateLoadingByView(nameStateModule) {
  const { state } = useStore();

  return {
    isLoading: computed(() => state[nameStateModule].isLoading),
    data: computed(() => state[nameStateModule].data),
    error: computed(() =>  state[nameStateModule].error),
  };
}