<template>
  <app-feed-item :api-url="apiUrl"></app-feed-item>
</template>


<script>
import AppFeedItem from '@/components/feed/FeedItem';

import { ref } from '@vue/reactivity';

export default {
  name: 'AppGlobalFeed',
  components: {
    AppFeedItem,
  },
  setup() {
    return {
      apiUrl: ref('/articles')
    };
  }
};
</script>