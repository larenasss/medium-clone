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

<script lang="ts">
import { defineComponent } from 'vue';

import { computed, onMounted } from '@vue/runtime-core';

import AppLoadingItem from '@/components/ui/LoadingItem.vue';
import AppErrorMessage from '@/components/errors/ErrorMessage.vue';
import { usePopularTagsStore } from '@/stores/popularTags';

export default defineComponent({
  name: 'AppPopularTags',
  components: {
    AppLoadingItem,
    AppErrorMessage
 },
  setup() {
    const store = usePopularTagsStore();

    onMounted(() => store.getPopularTags());

    return {
      isLoading: computed(() => store.isLoading),
      tags: computed(() => store.data),
      error: computed(() => store.error),
    };
  }
});
</script>