<template>
  <button v-if="followingAuthor"
    type="button"
    class="btn btn-sm action-btn"
    :class="{
      'btn-secondary': followingAuthor.following,
      'btn-outline-secondary': !followingAuthor.following,
    }"
    @click="onFallow"
  >
    <i class="ion-plus-round" />
    <span v-if="followingAuthor.following">
      UnFollow {{ followingAuthor.username }}
    </span>
    <span v-else>
      Follow {{ followingAuthor.username }}
    </span>
  </button>
</template>

<script lang="ts">
import { UserAuthor } from '@/entities/user';
import { useUserProfileStore } from '@/stores/userProfile';
import { computed, defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    userFallow: {
      type: Object as PropType<UserAuthor | null>,
      required: true
    }
  },
  setup(props) {
    const store = useUserProfileStore();

    const followingAuthor = computed<UserAuthor>(() => props.userFallow as UserAuthor);

    const onFallow = () => {
      store
        .addToFallow({
          slug: props.userFallow?.username as string,
          isFallow: props.userFallow?.following as boolean
        });
    };

    return {
      onFallow,
      followingAuthor
    };
  }
});
</script>