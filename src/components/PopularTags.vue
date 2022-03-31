<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-if="error">Something is broken</div>

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
import { computed, onMounted } from '@vue/runtime-core';
import { useStore } from 'vuex';

import { actionsTypesExport } from '@/store/modules/popularTags';

export default {
  name: 'AppPopularTags',
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