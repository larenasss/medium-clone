<template>
  <div class="home-page">
    <app-banner-item />
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <app-feed-toggle :tag-name="tagName"></app-feed-toggle>
          <app-feed-item :api-url="apiUrl"></app-feed-item>
        </div>
        <div class="col-md-3">
          <app-popular-tags></app-popular-tags>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppFeedItem from "@/components/FeedItem.vue";
import AppPopularTags from "@/components/PopularTags.vue";
import AppBannerItem from "@/components/BannerItem.vue";
import AppFeedToggle from "@/components/FeedToggle.vue";
import { computed } from '@vue/runtime-core';
import { useRoute } from 'vue-router';

export default {
  name: "AppYourFeed",
  components: {
    AppFeedItem,
    AppPopularTags,
    AppBannerItem,
    AppFeedToggle
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
