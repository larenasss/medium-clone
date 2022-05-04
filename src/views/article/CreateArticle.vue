<template>
  <app-article-form
    :initial-values="initialValues"
    :errors="validationErrors"
    :is-submitting="isSubmitting"
    @articleSubmit="onSubmit">
  </app-article-form>
</template>

<script>
import AppArticleForm from '@/components/article/ArticleForm';
import { useStore } from 'vuex';
import { computed } from '@vue/runtime-core';

import { actionsTypes  } from '@/store/modules/createArticle';
import { useRouter } from 'vue-router';
import { key } from '@/store';

export default {
  name: 'AppCreateArticle',
  components: {
    AppArticleForm,
  },
  setup() {
    const store = useStore(key);
    const router = useRouter();

    const initialValues = {
      title: '',
      description: '',
      body: '',
      tagList: []
    };

    const onSubmit = articleInput => {
      store
        .dispatch(actionsTypes.createArticle, { articleInput })
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