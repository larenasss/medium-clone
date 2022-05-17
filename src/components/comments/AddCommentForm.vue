<template>
  <div v-if="currentUser">
    <app-validation-errors v-if="errors" :validation-errors="errors"></app-validation-errors>
    <form class="card comment-form" @submit.prevent="onSubmit">
      <div class="card-block">
        <textarea class="form-control" :disabled="isSubmitting" v-model="commentInput.body"></textarea>
      </div>
      <div class="card-footer">
        <img class="comment-author-img" :src="currentUser.image"/>
        <button type="submit" class="btn btn-sm btn-primary" :disabled="isSubmitting">Post Comment</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { computed, reactive, watch, defineComponent, PropType } from 'vue';

import { useAuthUserStore } from '@/stores/auth';

import AppValidationErrors from '@/components/errors/ValidationErrors.vue';
import { Comment } from '@/entities/comment';

export default defineComponent({
  name: 'AppAddCommentForm',
  emits: ['addComment'],
  props: {
    isSubmitting: {
      type: Boolean,
      default: false
    },
    errors: {
      type: Object as PropType<object | null>,
      required: false,
    },
  },
  components: {
    AppValidationErrors
  },
  setup(props, { emit }) {
    const store = useAuthUserStore();

    const commentInput = reactive(new Comment());

    watch(() => props.isSubmitting, (nValue) => {
      if (!nValue) {
        commentInput.body = '';
      }
    });

    const onSubmit = () => emit('addComment', commentInput);

    return {
      commentInput,
      onSubmit,
      currentUser: computed(() => store.currentUser),
    };
  }
});
</script>