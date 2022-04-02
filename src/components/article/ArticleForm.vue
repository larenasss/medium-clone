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
                  v-model="dataForm.title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Description"
                  v-model="dataForm.description"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  placeholder="What is this article about?"
                  v-model="dataForm.body"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Enter tags"
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

<script>
import { reactive } from '@vue/reactivity';

import AppValidationErrors from '@/components/errors/ValidationErrors';

export default {
  name: 'AppArticleForm',
  emits: ['articleSubmit'],
  components: { AppValidationErrors },
  props: {
    initialValues: {
      type: Object,
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
    const dataForm = reactive(props.initialValues);

    const onSubmit = () => {
      const data = {
        title: dataForm.title,
        description: dataForm.description,
        body: dataForm.description,
        tagList: dataForm.tagList.split(' ')
      };
      emit('articleSubmit', data);
    };

    return {
      dataForm,
      onSubmit
    };
  }
};
</script>