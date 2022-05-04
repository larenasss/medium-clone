import { useStore } from 'vuex';
import { key } from '@/store/index';
import { computed } from '@vue/runtime-core';

export function useGetStateLoadingByView(nameStateModule: string) {
  const store = useStore(key);

  return {
    isLoading: computed(() => store.state[nameStateModule as keyof typeof store.state]['isLoading']),
    data: computed(() => store.state[nameStateModule as keyof typeof store.state]['data']),
    error: computed(() =>  store.state[nameStateModule as keyof typeof store.state]['error']),
  };
}