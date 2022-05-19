import { useStore } from 'vuex';
import { key } from '@/store/index';
import { computed } from '@vue/runtime-core';
import { LoadingState, RootState } from '@/store/types';

export function useGetStateLoadingByView<T>(nameStateModule: string) {
  const store = useStore(key);

  const state = store.state[nameStateModule as keyof RootState] as unknown as LoadingState<T>;

  return {
    isLoading: computed(() => state.isLoading),
    data: computed(() => state.data),
    error: computed(() =>  state.error),
  };
}