<template>
  <div class="card" v-if="comment">
    <div class="card-block">
      <p class="card-text">
        {{ comment.body }}
      </p>
    </div>
    <div class="card-footer">
      <app-user-info :user="comment.author" :date="comment.createdAt"></app-user-info>
      <button class="mod-options" v-if="isCurrentUserProfile" @click="deleteComment(comment.id)">
        <i class="ion-trash-a"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { useGetUserProfileState } from '@/use/userProfile/getUserProfileState';

import AppUserInfo from '@/components/userProfile/UserInfo';

export default {
  name: 'AppCommentItem',
  emits: ['deleteComment'],
  components: {
    AppUserInfo
  },
  props: {
    comment: {
      type: Object,
      required: true,
    }
  },
  setup(props, { emit }) {
    const { currentUser, isCurrentUserProfile } = useGetUserProfileState(props.comment.author);

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

<style lang="scss" scoped deep>
  .user-info {
    display: flex;
  }

  .card-footer::v-deep {
    display: flex;
    justify-content: space-between;
    align-items: center;

    & .user-info .comment-author {
      &:not(:last-child) {
        margin-right: .4rem;
      }
    }

    & .mod-options {
      float: none;
    }

    &::after {
      display: none;
    }
  }
</style>