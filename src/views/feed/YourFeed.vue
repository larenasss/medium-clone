<template>
  <div class="home-page">
    <app-feed-item :api-url="apiUrl"></app-feed-item>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';

import AppFeedItem from '@/components/feed/FeedItem.vue';

import { ref } from '@vue/reactivity';

export default defineComponent({
  name: 'AppYourFeed',
  components: { AppFeedItem },
  setup() {
    return {
      apiUrl: ref('/articles/feed')
    };
  }
});
</script>