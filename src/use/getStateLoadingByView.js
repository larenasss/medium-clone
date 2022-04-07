import { useStore } from 'vuex';
import { computed } from '@vue/runtime-core';

export function useGetStateLoadingByView(nameStateModule) {
  const store = useStore();

  return {
    isLoading: computed(() => store.state[nameStateModule].isLoading),
    data: computed(() => store.state[nameStateModule].data),
    error: computed(() =>  store.state[nameStateModule].error),
  };
}