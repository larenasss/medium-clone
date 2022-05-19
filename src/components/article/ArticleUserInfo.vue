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

import { ref } from '@vue/runtime-core';
import { useGetUserProfileState } from '@/use/userProfile/getUserProfileState';

import { convertDateJsonToDate } from '@/helpers/dateConverter';
import { useUserProfileStore } from '@/stores/userProfile';

export default defineComponent({
  name: 'AppArticleUserInfo',
  emits: ['deleteArticle'],
  props: {
    article: {
      type: Object,
      required: true,
    }
  },
  components: {
    AppUserInfo,
    AppAddToFavorites
  },
  setup(props, { emit }) {
    const store = useUserProfileStore();

    const isFollowing = ref(props.article.author.following);

    const { isCurrentUserProfile: isAuthor } = useGetUserProfileState(ref(props.article.author));

    const deleteArticle = (slug: string) => {
      emit('deleteArticle', slug);
    };

    const onFallow = () => {
      store
        .addToFallow({
          slug: props.article.author.username,
          isFallow: props.article.author.following
        })
        .then(() => isFollowing.value = !isFollowing.value);
    };

    return {
      convertDateJsonToDate,
      onFallow,
      isFollowing,
      isAuthor,
      deleteArticle
    };
  }
});
</script>