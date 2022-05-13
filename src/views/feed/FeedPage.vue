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

<script lang="ts">
import { defineComponent } from 'vue';

import { useRoute } from 'vue-router';
import { computed } from '@vue/runtime-core';

import AppPopularTags from '@/components/ui/PopularTags.vue';
import AppBannerItem from '@/components/ui/BannerItem.vue';
import AppFeedToggle from "@/components/feed/FeedToggle.vue";

export default defineComponent({
  name: 'AppFeedPage',
  components: {
    AppPopularTags, AppBannerItem, AppFeedToggle
  },
  setup() {
    const route = useRoute();
    const tagName = computed(() => route.params.slug) as unknown as string;

    return {
      tagName
    };
  }
});
</script>