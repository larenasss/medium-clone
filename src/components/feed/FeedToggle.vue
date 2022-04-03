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

<script>
import { gettersTypes } from '@/store/modules/auth';

import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
export default {
  name: 'AppFeedToggle',
  props: {
    tagName: {
      type: String,
      required: false
    }
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const isLoggedIn = computed(() => store.getters[gettersTypes.isLoggedIn]);
    const routeName = computed(() => route.name);

    return {
      isLoggedIn,
      routeName
    };
  }
};
</script>