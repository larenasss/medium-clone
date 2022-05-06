<template>
  <app-feed-item :api-url="apiUrl"></app-feed-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import AppFeedItem from "@/components/feed/FeedItem.vue";
import { computed } from '@vue/runtime-core';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: "AppYourFeed",
  components: {
    AppFeedItem,
  },
  setup() {
    const route = useRoute();
    const tagName = computed(() => route.params.slug);

    return {
      tagName,
      apiUrl: computed(() => `articles?tag=${tagName.value}`),
    };
  },
});
</script>
