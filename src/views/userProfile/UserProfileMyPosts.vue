<template>
  <app-feed-item :api-url="apiUrl"></app-feed-item>
</template>

<script>
import { useSetupUserProfilePage } from '@/use/userProfile/setupUserProfilePage';

import AppFeedItem from '@/components/feed/FeedItem';

export default {
  name: 'AppUserProfileMyPosts',
  components: { AppFeedItem },
  setup() {
    return {
      ...useSetupUserProfilePage()
    };
  }
};
</script>