<template>
  <button
    class="btn btn-sm"
    :class="{'btn-primary': isFavoritedOptimistic, 'btn-outline-primary': !isFavoritedOptimistic}"
    @click="handleLike">
    <i class="ion-heart"></i>
    {{ favoritesCountOptimistic }}
  </button>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useStore } from 'vuex';
import { actionsTypes } from '@/store/modules/addToFavorites/types';
import { key } from '@/store';
export default {
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
    const store = useStore(key);

    const isFavoritedOptimistic = ref(props.isFavorited);
    const favoritesCountOptimistic = ref(props.favoritesCount);

    const handleLike = () => {
      store.dispatch(actionsTypes.addToFavorites, {
        slug: props.articleSlug,
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
};
</script>