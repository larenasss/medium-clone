<template>
  <app-feed-item :api-url="apiUrl"></app-feed-item>
</template>

<script>
import AppFeedItem from "@/components/feed/FeedItem";
import { computed } from '@vue/runtime-core';
import { useRoute } from 'vue-router';

export default {
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
};
</script>
