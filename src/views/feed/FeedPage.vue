<template>
  <div class="home-page">
    <app-banner-item />
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <app-feed-toggle :tag-name="tagName"></app-feed-toggle>
          <router-view></router-view>
        </div>
        <div class="col-md-3">
          <app-popular-tags></app-popular-tags>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppPopularTags from '@/components/ui/PopularTags';
import AppBannerItem from '@/components/ui/BannerItem';
import AppFeedToggle from "@/components/feed/FeedToggle";
import { useRoute } from 'vue-router';
import { computed } from '@vue/runtime-core';

export default {
  name: 'AppFeedPage',
  components: {
    AppPopularTags, AppBannerItem, AppFeedToggle
  },
  setup() {
    const route = useRoute();
    const tagName = computed(() => route.params.slug);

    return {
      tagName
    };
  }
};
</script>