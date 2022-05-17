<template>
  <nav class="navbar navbar-light">
    <div class="container">
      <router-link class="navbar-brand" :to="{name: 'globalFeed'}">
        MediumClone
      </router-link>
      <ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item">
          <router-link class="nav-link" :to="{name: 'globalFeed'}" active-class="active">
            Home
          </router-link>
        </li>
        <template v-if="isLoggedIn">
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'createArticle'}" active-class="active">
              <i class="ion-compose"></i>
              New Article
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'settings'}" active-class="active">
              <i class="ion-gear-a"></i>
              Settings
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'userProfileMyPosts', params: {slug: currentUser.username}}" active-class="active">
              <img class="user-pic" :src="currentUser.image">
              {{ currentUser.username }}
            </router-link>
          </li>
        </template>
        <template v-if="isAnonymous">
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'login'}" active-class="active">
              Sing in
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{name: 'register'}" active-class="active">
              Sing up
            </router-link>
          </li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { computed } from '@vue/runtime-core';

import { useAuthUserStore } from '@/stores/auth';

export default defineComponent({
  name: 'AppTopBar',
  setup() {
    const store = useAuthUserStore();

    const currentUser = computed(() => store.currentUser);
    const isLoggedIn = computed(() => store.isLoggedIn);
    const isAnonymous = computed<boolean>(() => store.isAnonymous);

    return {
      currentUser,
      isAnonymous,
      isLoggedIn
    };
  }
});
</script>