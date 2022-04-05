<template>
  <div class="card" v-if="comment">
    <div class="card-block">
      <p class="card-text">
        {{ comment.body }}
      </p>
    </div>
    <div class="card-footer">
      <router-link class="comment-author" :to="{name: 'userProfileMyPosts', params: {slug: comment.author.username}}" active-class="active">
        <img class="comment-author-img" :src="comment.author.image">&nbsp;
      </router-link>
      <router-link class="comment-author" :to="{name: 'userProfileMyPosts', params: {slug: comment.author.username}}" active-class="active">
        {{ comment.author.username }}
      </router-link>
      <span class="date-posted">
        {{ comment.createdAt }}
      </span>
      <button class="mod-options" v-if="isCurrentUserProfile" @click="deleteComment(comment.id)">
        <i class="ion-trash-a"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { gettersTypes } from '@/store/modules/auth';

import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex';
export default {
  name: 'AppCommentItem',
  emits: ['deleteComment'],
  props: {
    comment: {
      type: Object,
      required: true,
    }
  },
  setup(props, { emit }) {
    const store = useStore();
    const currentUser = computed(() => store.getters[gettersTypes.currentUser]);

    const isCurrentUserProfile = computed(() => {
      if (!currentUser.value || !props.comment) {
        return false;
      }
      return props.comment.author.username === currentUser.value.username;
    });

    const deleteComment = slugComment => {
      emit('deleteComment', { slugComment });
    };

    return {
      isCurrentUserProfile,
      currentUser,
      deleteComment
    };
  }
};
</script>
<style lang="scss" scoped>
  .article-page .card .mod-options {
    outline: none;
    border: none;
    background: transparent;

    & i {
      margin: 0;
    }
  }
</style>