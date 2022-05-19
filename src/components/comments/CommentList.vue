<template>
  <div v-if="comments">
    <div v-for="comment in comments" :key="comment.id">
      <app-comment-item :comment="comment" @deleteComment="deleteComment"></app-comment-item>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import { computed, onMounted } from '@vue/runtime-core';

import AppCommentItem from '@/components/comments/CommentItem.vue';
import { useCommentsStore } from '@/stores/comments';

export default defineComponent({
  name: 'AppCommentList',
  components: {
    AppCommentItem
  },
  props: {
    slug: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup(props) {
    const store = useCommentsStore();

    onMounted(() => {
      store.getComments({ slug: props.slug });
    });

    const deleteComment = ({ slugComment }: { slugComment: string }) => {
      const data = { slugArticle: props.slug, slugComment };
      store.deleteComment(data);
    };

    return {
      isLoading: computed(() => store.isLoading),
      comments: computed(() => store.data),
      error: computed(() => store.error),
      deleteComment
    };
  }
});
</script>