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
import AppLoadingItem from '@/components/LoadingItem.vue';
import AppErrorMessage from '@/components/ErrorMessage.vue';

import { computed, onMounted } from '@vue/runtime-core';
import { useStore } from 'vuex';

import { actionsTypesExport } from '@/store/modules/popularTags';

export default {
  name: 'AppPopularTags',
  components: {
    AppLoadingItem,
    AppErrorMessage
 },
  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch(actionsTypesExport.getPopularTags);
    });

    return {
      isLoading: computed(() => store.state.popularTags.isLoading),
      tags: computed(() => store.state.popularTags.data),
      error: computed(() => store.state.popularTags.error),
    };
  }
};
</script>