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
        <button
          type="button"
          class="btn btn-sm action-btn"
          :class="{
            'btn-secondary': isFollowing,
            'btn-outline-secondary': !isFollowing,
          }"
          @click="onFallow"
        >
          <i class="ion-plus-round" />
          <span v-if="isFollowing">
            UnFollow {{ article.author.username }}
          </span>
          <span v-else>
            Follow {{ article.author.username }}
          </span>
        </button>
        &nbsp;
        <app-add-to-favorites
          :is-favorited="article.favorited"
          :article-slug="article.slug"
          :favorites-count="article.favoritesCount"
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

import { computed } from '@vue/runtime-core';
import { useGetUserProfileState } from '@/use/userProfile/getUserProfileState';

import { convertDateJsonToDate } from '@/helpers/dateConverter';
import { useUserProfileStore } from '@/stores/userProfile';
import { Article } from '@/entities/article';
import { UserAuthor } from '@/entities/user';
import { useArticleStore } from '@/stores/article';

import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'AppArticleUserInfo',
  components: {
    AppUserInfo,
    AppAddToFavorites
  },
  setup() {
    const store = useUserProfileStore();
    const articleStore = useArticleStore();
    const router = useRouter();

    const article = computed<Article>(() => articleStore.data as Article);
    const isFollowing = computed(() => article.value.author?.following);

    const { isCurrentUserProfile: isAuthor } = useGetUserProfileState(computed(() => article.value.author ?? new UserAuthor()));

    const deleteArticle = () => {
      articleStore
        .deleteArticle({ slug: article.value.slug as string })
        .then(() => {
          router.push({ name: 'globalFeed' });
        });
    };

    const onFallow = () => {
      store
        .addToFallow({
          slug: article.value.author?.username as string,
          isFallow: !article.value.author?.following as boolean
        });
    };

    return {
      article,
      convertDateJsonToDate,
      onFallow,
      isFollowing,
      isAuthor,
      deleteArticle
    };
  }
});
</script>