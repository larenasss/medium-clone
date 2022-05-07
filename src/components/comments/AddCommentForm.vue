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
import { computed, reactive, watch, ComputedRef, defineComponent } from 'vue';

import { useStore } from 'vuex';
import { key } from '@/store/index';

import { gettersTypes as authGettersTypes } from '@/store/modules/auth/types';

import AppValidationErrors from '@/components/errors/ValidationErrors.vue';
import { Comment } from '@/entities/comment';
import { UserProfile } from '@/entities/user';

export default defineComponent({
  name: 'AppAddCommentForm',
  emits: ['addComment'],
  props: {
    isSubmitting: {
      type: Boolean,
      default: false
    },
    errors: {
      type: Object,
      required: false,
    },
  },
  components: {
    AppValidationErrors
  },
  setup(props, { emit }) {
    const store = useStore(key);

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
      currentUser: computed<ComputedRef<UserProfile>>(() => store.getters[authGettersTypes.currentUser]),
    };
  }
});
</script>