<template>
  <app-article-form
    :initial-values="initialValues"
    :errors="validationErrors"
    :is-submitting="isSubmitting"
    @articleSubmit="onSubmit">
  </app-article-form>
</template>

<script>
import AppArticleForm from '@/components/ArticleForm';
import { useStore } from 'vuex';
import { computed } from '@vue/runtime-core';

import { actionsTypesExport  } from '@/store/modules/createArticle';
import { useRouter } from 'vue-router';

export default {
  name: 'AppCreateArticle',
  components: {
    AppArticleForm,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const initialValues = {
      title: '',
      description: '',
      body: '',
      tagList: []
    };

    const onSubmit = articleInput => {
      store
        .dispatch(actionsTypesExport.createArticle, { articleInput })
        .then(article => {
          router.push({ name: 'article', params: { slug: article.slug }});
        });
    };

    return {
      initialValues,
      validationErrors: computed(() => store.state.createArticle.validationErrors),
      isSubmitting: computed(() => store.state.createArticle.isSubmitting),
      onSubmit
    };
  }
};
</script>