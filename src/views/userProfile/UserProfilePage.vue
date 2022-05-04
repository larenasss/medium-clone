<template>
  <div class="profile-page" v-if="userProfile">
    <div class="profile-page__user-info">
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
                    name: 'userProfileMyPosts',
                    params: { slug: userProfile.username },
                  }"
                  class="nav-link"
                  :class="{ active: routeName === 'userProfileMyPosts' }"
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
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, watch } from '@vue/runtime-core';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

import { actionsTypes as userProfileActionsTypes } from '@/store/modules/userProfile/types';
import { useGetStateLoadingByView } from '@/use/getStateLoadingByView';
import { useGetUserProfileState } from '@/use/userProfile/getUserProfileState';
import { key } from '@/store';

export default {
  name: 'AppUserProfile',
  setup() {
    const store = useStore(key);
    const route = useRoute();

    const { isLoading, data: userProfile, error  } = useGetStateLoadingByView('userProfile');
    const { isCurrentUserProfile } = useGetUserProfileState(userProfile);

    const userProfileSlug = computed(() => route.params.slug);
    const routeName = computed(() => route.name);

    watch(() => userProfileSlug.value, () => fetchUserProfile());
    onMounted(() => fetchUserProfile());

    const fetchUserProfile = () => {
      store.dispatch(userProfileActionsTypes.getUserProfile, {
        slug: userProfileSlug.value
      });
    };

    return {
      isLoading,
      userProfile,
      error,
      isCurrentUserProfile,
      routeName
    };
  }
};
</script>

<style lang="scss">
  .profile-page {
    & .user-info {
      text-align: start;
      background: transparent;
      padding: 0;
    }

    &__user-info {
      text-align: center;
      background: #f3f3f3;
      padding: 2rem 0 1rem;

      & .user-img {
        width: 100px;
        height: 100px;
        border-radius: 100px;
        margin-bottom: 1rem;
      }

      & h4 {
        font-weight: 700;
      }

      & p {
        margin: 0 auto 0.5rem;
        color: #aaa;
        max-width: 450px;
        font-weight: 300;
      }

      .action-btn {
        float: right;
        color: #999;
        border: 1px solid #999;
      }
    }
  }
</style>