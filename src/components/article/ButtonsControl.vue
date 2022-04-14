<template>
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
      <button class="btn btn-outline-danger btn-sm" @click="deleteArticle">
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
</template>

<script>
import { ref } from '@vue/runtime-core';
import { useStore } from 'vuex';

import { actionsTypes } from '@/store/modules/userProfile';
import { useGetUserProfileState } from '@/use/userProfile/getUserProfileState';

import AppAddToFavorites from '@/components/ui/AddToFavorites';

export default {
  name: 'AppButtonsControl',
  components: {
    AppAddToFavorites
  },
  props: {
    article: {
      type: Object,
      requred: true
    }
  },
  setup(props) {
    const store = useStore();

    const isFollowing = ref(props.article.author.following);

    const { isCurrentUserProfile: isAuthor } = useGetUserProfileState(ref(props.article.author));

    const onFallow = () => {
      store.dispatch(actionsTypes.addToFallow, {
        slug: props.article.author.username,
        isFallow: props.article.author.following
      }).then(() => isFollowing.value = !isFollowing.value);
    };

    return {
      onFallow,
      isFollowing,
      isAuthor
    };
  }
};
</script>