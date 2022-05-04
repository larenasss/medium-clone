<template>
  <div>
    <app-loading-item v-if="isLoading" />
    <app-error-message v-if="error" />

    <div class="sidebar" v-if="tags">
      <p>Popular Tags</p>
      <div class="tag-list">
        <router-link
          v-for="tag in tags"
          :key="tag"
          :to="{name: 'tag', params: {slug: tag}}"
          class="tag-default tag-pill"
        >
          {{ tag }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from '@vue/runtime-core';
import { useStore } from 'vuex';

import { actionsTypes } from '@/store/modules/popularTags/types';
import { useGetStateLoadingByView } from '@/use/getStateLoadingByView';

import AppLoadingItem from '@/components/ui/LoadingItem.vue';
import AppErrorMessage from '@/components/errors/ErrorMessage.vue';
import { key } from '@/store';

export default {
  name: 'AppPopularTags',
  components: {
    AppLoadingItem,
    AppErrorMessage
 },
  setup() {
    const store = useStore(key);

    const { isLoading, data: tags, error  } = useGetStateLoadingByView('popularTags');

    onMounted(() => {
      store.dispatch(actionsTypes.getPopularTags);
    });

    return {
      isLoading,
      tags,
      error,
    };
  }
};
</script>