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

<script>
import { computed, reactive, watch } from 'vue';
import { useStore } from 'vuex';

import { gettersTypes as authGettersTypes } from '@/store/modules/auth';

import AppValidationErrors from '@/components/errors/ValidationErrors';

export default {
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
    const store = useStore();

    const commentInput = reactive({
      body: ''
    });

    watch(() => props.isSubmitting, (nValue) => {
      if (!nValue) {
        commentInput.body = '';
      }
    });

    const onSubmit = () => {
      emit('addComment', commentInput);
    };

    return {
      commentInput,
      onSubmit,
      currentUser: computed(() => store.getters[authGettersTypes.currentUser]),
    };
  }
};
</script>