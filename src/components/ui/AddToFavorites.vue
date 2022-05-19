<template>
  <button
    class="btn btn-sm"
    :class="{'btn-primary': isFavoritedOptimistic, 'btn-outline-primary': !isFavoritedOptimistic}"
    @click="handleLike">
    <i class="ion-heart"></i>
    {{ favoritesCountOptimistic }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { ref } from '@vue/reactivity';
import { useAddToFavoritesStore } from '@/stores/addToFavorites';

export default defineComponent({
  name: 'AppAddToFavorites',
  props: {
    isFavorited: {
      type: Boolean,
      requred: true,
    },
    articleSlug: {
      type: String,
      requred: true
    },
    favoritesCount: {
      type: Number,
      requred: true
    },
    text: {
      type: String,
      requred: false
    }
  },
  setup(props) {
    const store = useAddToFavoritesStore();

    const isFavoritedOptimistic = ref(props.isFavorited ?? false);
    const favoritesCountOptimistic = ref(props.favoritesCount ?? 0);

    const handleLike = () => {
      store.addToFavorites({
        slug: props.articleSlug as string,
        isFavorited: isFavoritedOptimistic.value
      });

      if (isFavoritedOptimistic.value) {
        favoritesCountOptimistic.value -= 1;
      } else {
        favoritesCountOptimistic.value += 1;
      }
      isFavoritedOptimistic.value = !isFavoritedOptimistic.value;
    };

    return {
      handleLike,
      isFavoritedOptimistic,
      favoritesCountOptimistic,
    };
  }
});
</script>