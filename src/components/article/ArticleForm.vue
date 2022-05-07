<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <app-validation-errors v-if="errors" :validation-errors="errors"></app-validation-errors>
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Article title"
                  :disabled="isSubmitting"
                  v-model="dataForm.title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Description"
                  :disabled="isSubmitting"
                  v-model="dataForm.description"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  placeholder="What is this article about?"
                  :disabled="isSubmitting"
                  v-model="dataForm.body"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Enter tags"
                  :disabled="isSubmitting"
                  v-model="dataForm.tagList"
                />
              </fieldset>
              <fieldset class="form-group">
                <button
                  type="submit"
                  class="btn btn-lg pull-xs-right btn-primary"
                  :disabled="isSubmitting"
                >
                  Publish Article
                </button>
              </fieldset>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { reactive } from '@vue/reactivity';

import AppValidationErrors from '@/components/errors/ValidationErrors.vue';
import { Article } from '@/entities/article';

export default defineComponent({
  name: 'AppArticleForm',
  emits: ['articleSubmit'],
  components: { AppValidationErrors },
  props: {
    initialValues : {
      type: Article,
      required: true
    },
    errors: {
      type: Object,
      required: false,
    },
    isSubmitting: {
      type: Boolean,
      required: true
    }
  },
  setup(props, { emit }) {
    const dataForm = reactive(new Article(props.initialValues));

    const onSubmit = () => emit('articleSubmit', dataForm);

    return {
      dataForm,
      onSubmit
    };
  }
});
</script>