<template>
  <app-feed-item :api-url="apiUrl"></app-feed-item>
</template>


<script lang="ts">
import { defineComponent } from 'vue';

import AppFeedItem from '@/components/feed/FeedItem.vue';

import { ref } from '@vue/reactivity';

export default defineComponent({
  name: 'AppGlobalFeed',
  components: {
    AppFeedItem,
  },
  setup() {
    return {
      apiUrl: ref('/articles')
    };
  }
});
</script>