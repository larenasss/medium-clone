<template>
  <ul class="col-xs-12 col-md-8 offset-md-2" v-if="comments">
    <div v-for="comment in comments" :key="comment.id">
      <app-comment-item :comment="comment" @deleteComment="deleteComment"></app-comment-item>
    </div>
  </ul>
</template>

<script>
import { useStore } from 'vuex';
import { onMounted } from '@vue/runtime-core';

import { actionsTypes } from '@/store/modules/comments';
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
    const store = useStore();

    onMounted(() => {
      store.dispatch(actionsTypes.getComments, { slug: props.slug });
    });

    const { isLoading, data: comments, error  } = useGetStateLoadingByView('comments');

    const deleteComment = ({ slugComment }) => {
      const data = { slugArticle: props.slug, slugComment };
      store.dispatch(actionsTypes.deleteComments, data);
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