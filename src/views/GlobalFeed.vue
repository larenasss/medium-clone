<template>
  <div class="home-page">
    BANNER
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <app-feed-item :api-url="apiUrl"></app-feed-item>
        </div>
        <div class="col-md-3">POPULAR TAGS</div>
      </div>
    </div>
  </div>
</template>


<script>
import AppFeedItem from '@/components/FeedItem.vue';
import { ref } from '@vue/reactivity';

export default {
  name: 'AppGlobalFeed',
  components: { AppFeedItem },
  setup() {
    return {
      apiUrl: ref('/articles')
    };
  }
};
</script>