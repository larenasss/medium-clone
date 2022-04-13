<template>
  <template v-if="article">
    <button
      type="button"
      class="btn btn-sm action-btn"
      :class="{'btn-secondary': isFollowing, 'btn-outline-secondary': !isFollowing}"
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
  </template>
</template>

<script>
import { useStore } from 'vuex';

import { actionsTypes } from '@/store/modules/userProfile';

import AppAddToFavorites from '@/components/ui/AddToFavorites';
import { ref } from '@vue/runtime-core';

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

    const onFallow = () => {
      store.dispatch(actionsTypes.addToFallow, {
        slug: props.article.author.username,
        isFallow: props.article.author.following
      }).then(() => isFollowing.value = !isFollowing.value);
    };

    return {
      onFallow,
      isFollowing
    };
  }
};
</script>