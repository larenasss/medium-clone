import { useStore } from 'vuex';
import { key } from '@/store/index';
import { computed } from '@vue/runtime-core';
import { LoadingState, RootState } from '@/store/types';

export function useGetStateLoadingByView(nameStateModule: string) {
  const store = useStore(key);

  return {
    isLoading: computed(() => (<LoadingState>store.state[nameStateModule as keyof RootState]).isLoading),
    data: computed(() => (<LoadingState>store.state[nameStateModule as keyof RootState]).data),
    error: computed(() =>  (<LoadingState>store.state[nameStateModule as keyof RootState]).error),
  };
}