<template>
  <div v-if="comments">
    <div v-for="comment in comments" :key="comment.id">
      <app-comment-item :comment="comment" @deleteComment="deleteComment"></app-comment-item>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { useStore } from 'vuex';
import { key } from '@/store/index';
import { onMounted } from '@vue/runtime-core';

import { actionsTypes } from '@/store/modules/comments/types';
import { useGetStateLoadingByView } from '@/use/getStateLoadingByView';

import AppCommentItem from '@/components/comments/CommentItem.vue';
import { Comment } from '@/entities/comment';

export default defineComponent({
  name: 'AppCommentList',
  components: {
    AppCommentItem
  },
  props: {
    slug: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore(key);

    onMounted(() => {
      store.dispatch(actionsTypes.getComments, { slug: props.slug });
    });

    const { isLoading, data: comments, error  } = useGetStateLoadingByView<Comment>('comments');

    const deleteComment = ({ slugComment }: { slugComment: string }) => {
      const data = { slugArticle: props.slug, slugComment };
      store.dispatch(actionsTypes.deleteComment, data);
    };

    return {
      isLoading,
      comments,
      error,
      deleteComment
    };
  }
});
</script>