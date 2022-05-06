<template>
  <app-feed-item :api-url="apiUrl"></app-feed-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useSetupUserProfilePage } from '@/use/userProfile/setupUserProfilePage';

import AppFeedItem from '@/components/feed/FeedItem.vue';

export default defineComponent({
  name: 'AppUserProfileMyPosts',
  components: { AppFeedItem },
  setup() {
    return {
      ...useSetupUserProfilePage()
    };
  }
});
</script>