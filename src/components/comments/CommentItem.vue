<template>
  <div class="card" v-if="comment">
    <div class="card-block">
      <p class="card-text">
        {{ comment.body }}
      </p>
    </div>
    <div class="card-footer">
      <app-user-info :user="comment.author" :date="dateString(comment.createdAt)"></app-user-info>
      <button class="mod-options" v-if="isCurrentUserProfile" @click="deleteComment(comment.id)">
        <i class="ion-trash-a"></i>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';

import { useGetUserProfileState } from '@/use/userProfile/getUserProfileState';

import AppUserInfo from '@/components/userProfile/UserInfo.vue';
import { convertDateJsonToDate } from '@/helpers/dateConverter';
import { Comment } from '@/entities/comment';

export default defineComponent({
  name: 'AppCommentItem',
  emits: ['deleteComment'],
  components: {
    AppUserInfo
  },
  props: {
    comment: {
      type: Object as PropType<Comment>,
      required: true,
    }
  },
  setup(props, { emit }) {
    const { currentUser, isCurrentUserProfile } = useGetUserProfileState(computed(() => props.comment.author));

    const deleteComment = (slugComment: number) => {
      emit('deleteComment', { slugComment });
    };

    const dateString = (createdAt: string) => {
      return convertDateJsonToDate(createdAt)?.toLocaleString();
    };

    return {
      isCurrentUserProfile,
      currentUser,
      deleteComment,
      dateString
    };
  }
});
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