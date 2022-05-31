<template>
  <div class="article-meta d-flex">
    <app-user-info :user="article.author" :date="convertDateJsonToDate(article.createdAt).toLocaleString()"></app-user-info>
    <template v-if="article">
      <span v-if="isAuthor">
        <router-link
          class="btn btn-outline-secondary btn-sm"
          :to="{ name: 'editArticle', params: { slug: article.slug } }"
        >
          <i class="ion-edit" />
          Edit Article
        </router-link>
        &nbsp;
        <button class="btn btn-outline-danger btn-sm" @click="deleteArticle(article.slug)">
          <i class="ion-trash-a" />
          Delete Article
        </button>
      </span>
      <span v-else>
        <app-user-profile-fallow :userFallow="userProfile">
        </app-user-profile-fallow>
        &nbsp;
        <app-add-to-favorites
          :is-favorited="article.favorited"
          :article-slug="article.slug"
          :favorites-count="article.favoritesCount"
          @handleLike=handleLike
        >
        </app-add-to-favorites>
      </span>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import AppUserInfo from '@/components/userProfile/UserInfo.vue';
import AppAddToFavorites from '@/components/ui/AddToFavorites.vue';
import AppUserProfileFallow from '@/components/userProfile/UserProfileFallow.vue';

import { computed } from '@vue/runtime-core';
import { useGetUserProfileState } from '@/use/userProfile/getUserProfileState';

import { convertDateJsonToDate } from '@/helpers/dateConverter';
import { Article } from '@/entities/article';
import { useArticleStore } from '@/stores/article';

import { useRouter } from 'vue-router';
import { useUserProfileStore } from '@/stores/userProfile';

import { ReturnLike } from '@/components/ui/types';

export default defineComponent({
  name: 'AppArticleUserInfo',
  components: {
    AppUserInfo,
    AppAddToFavorites,
    AppUserProfileFallow
  },
  setup() {
    const articleStore = useArticleStore();
    const userProfileStore = useUserProfileStore();
    const router = useRouter();

    const article = computed<Article>(() => articleStore.data as Article);
    const isFollowing = computed(() => article.value.author?.following);

    const { isCurrentUserProfile: isAuthor } = useGetUserProfileState(computed(() => article.value.author ?? null));

    const deleteArticle = () => {
      articleStore
        .deleteArticle({ slug: article.value.slug as string })
        .then(() => {
          router.push({ name: 'globalFeed' });
        });
    };

    const handleLike = (returnLike: ReturnLike) => {
      articleStore.$patch((store) => {
        if (store.data) {
          store.data.favorited = returnLike.isFavorited;
          store.data.favoritesCount = returnLike.favoritesCount;
        }
      });
    };

    return {
      article,
      userProfile: computed(() => userProfileStore.data),
      convertDateJsonToDate,
      isFollowing,
      isAuthor,
      deleteArticle,
      handleLike
    };
  }
});
</script>