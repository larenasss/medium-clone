<template>
  <div v-if="comments">
    <div v-for="comment in comments" :key="comment.id">
      <app-comment-item :comment="comment" @deleteComment="deleteComment"></app-comment-item>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { key } from '@/store/index';
import { onMounted } from '@vue/runtime-core';

import { actionsTypes } from '@/store/modules/comments/types';
import { useGetStateLoadingByView } from '@/use/getStateLoadingByView';

import AppCommentItem from '@/components/comments/CommentItem.vue';
export default {
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

    const { isLoading, data: comments, error  } = useGetStateLoadingByView('comments');

    const deleteComment = ({ slugComment }) => {
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
};
</script>