import { useStore } from 'vuex';
import { key } from '@/store/index';
import { computed } from '@vue/runtime-core';
import { LoadingState, RootState } from '@/store/types';

export function useGetStateLoadingByView<T>(nameStateModule: string) {
  const store = useStore(key);

  const state = store.state[nameStateModule as keyof RootState];

  return {
    isLoading: computed(() => (<LoadingState<T>>state).isLoading),
    data: computed(() => (<LoadingState<T>>state).data),
    error: computed(() =>  (<LoadingState<T>>state).error),
  };
}