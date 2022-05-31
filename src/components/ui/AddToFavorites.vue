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
import { defineComponent, watch } from 'vue';

import { ref } from '@vue/reactivity';
import { useAddToFavoritesStore } from '@/stores/addToFavorites';
import { ReturnLike } from '@/components/ui/types';

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
    }
  },
  setup(props, { emit }) {
    const store = useAddToFavoritesStore();

    const isFavoritedOptimistic = ref(props.isFavorited ?? false);
    const favoritesCountOptimistic = ref(props.favoritesCount ?? 0);

    watch(() => [props.isFavorited, props.favoritesCount], (nValue) => {
      isFavoritedOptimistic.value = !nValue[0] as boolean;
      favoritesCountOptimistic.value = nValue[1] as number;
    });

    const handleLike = () => {
      const nandleLikeObj: ReturnLike = {
        slug: props.articleSlug as string,
        isFavorited: isFavoritedOptimistic.value,
        favoritesCount: isFavoritedOptimistic.value ? favoritesCountOptimistic.value - 1 : favoritesCountOptimistic.value + 1
      };

      store.addToFavorites(nandleLikeObj);
      emit('handleLike', nandleLikeObj);
    };

    return {
      handleLike,
      isFavoritedOptimistic,
      favoritesCountOptimistic,
    };
  }
});
</script>
