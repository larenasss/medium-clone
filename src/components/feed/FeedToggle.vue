<template>
  <div class="feed-toggle">
    <ul class="nav nav-pills outline-active">
      <li class="nav-item" v-if="isLoggedIn">
        <router-link
          :to="{name: 'yourFeed'}"
          class="nav-link"
          :class="{active: routeName === 'yourFeed'}">
          Your Feed
        </router-link>
      </li>
      <li class="nav-item">
        <router-link
          :to="{name: 'globalFeed'}"
          class="nav-link"
          :class="{active: routeName === 'globalFeed'}">
          Global Feed
        </router-link>
      </li>
      <li class="nav-item" v-if="tagName">
        <router-link
          :to="{name: 'tag'}"
          class="nav-link"
          :class="{active: routeName === 'tag'}">
          <i class="ion-pound"></i>
          {{ tagName }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { computed } from '@vue/runtime-core';
import { useRoute } from 'vue-router';

import { useAuthUserStore } from '@/stores/auth';

export default defineComponent({
  name: 'AppFeedToggle',
  props: {
    tagName: {
      type: String,
      required: false
    }
  },
  setup() {
    const store = useAuthUserStore();
    const route = useRoute();

    const isLoggedIn = computed(() => store.isLoggedIn);
    const routeName = computed(() => route.name);

    return {
      isLoggedIn,
      routeName
    };
  }
});
</script>