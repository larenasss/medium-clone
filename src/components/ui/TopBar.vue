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

<script>
import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex';
import { gettersTypes } from '@/store/modules/auth/types';
import { key } from '@/store';

export default {
  name: 'AppTopBar',
  setup() {
    const store = useStore(key);

    const currentUser = computed(() => store.getters[gettersTypes.currentUser]);
    const isLoggedIn = computed(() => store.getters[gettersTypes.isLoggedIn]);
    const isAnonymous = computed(() => store.getters[gettersTypes.isAnonymous]);

    return {
      currentUser,
      isAnonymous,
      isLoggedIn
    };
  }
};
</script>