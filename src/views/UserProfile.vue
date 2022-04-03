<template>
  <div class="profile-page" v-if="userProfile">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img class="user-img" :src="userProfile.image" />
            <h4>{{ userProfile.username }}</h4>
            <p>{{ userProfile.bio }}</p>
            <div>
              FOLLOW USER BUTTON
              <router-link
                v-if="isCurrentUserProfile"
                class="btn btn-sm btn-outline-secondary action-btn"
                :to="{ name: 'settings' }"
              >
                Edit Profile Settings
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="article-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <router-link
                  :to="{
                    name: 'userProfile',
                    params: { slug: userProfile.username },
                  }"
                  class="nav-link"
                  :class="{ active: routeName === 'userProfile' }"
                >
                  My Posts
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                  :to="{
                    name: 'userProfileFavorites',
                    params: { slug: userProfile.username },
                  }"
                  class="nav-link"
                  :class="{ active: routeName === 'userProfileFavorites' }"
                >
                  Favorites Posts
                </router-link>
              </li>
            </ul>
          </div>
          <app-feed-item :api-url="apiUrl"></app-feed-item>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppFeedItem from '@/components/feed/FeedItem';

import { computed, onMounted } from '@vue/runtime-core';
import { useStore } from 'vuex';
import { actionsTypes as userProfileActionsTypes } from '@/store/modules/userProfile';
import { gettersTypes as authGettersTypes } from '@/store/modules/auth';
import { useRoute } from 'vue-router';

export default {
  name: 'AppUserProfile',
  components: {
    AppFeedItem
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const currentUser = computed(() => store.getters[authGettersTypes.currentUser]);
    const userProfile = computed(() => store.state.userProfile.data);
    const isLoading = computed(() => store.state.userProfile.isLoading);
    const error = computed(() => store.state.userProfile.error);
    const userProfileSlug = computed(() => route.params.slug);

    const isCurrentUserProfile = computed(() => {
      if (!currentUser.value || !userProfile.value) {
        return false;
      }
      return currentUser.value.username === userProfile.value.username;
    });

    const apiUrl = computed(() => {
      const isFavorites = route.path.includes('favorites');
      return isFavorites
        ? `/articles?favorited=${userProfileSlug.value}`
        : `/articles?author=${userProfileSlug.value}`;
    });

    const routeName = computed(() => route.name);

    onMounted(() => {
      store.dispatch(userProfileActionsTypes.getUserProfile, {
        slug: userProfileSlug.value
      });
    });

    return {
      isLoading,
      userProfile,
      error,
      isCurrentUserProfile,
      apiUrl,
      routeName
    };
  }
};
</script>