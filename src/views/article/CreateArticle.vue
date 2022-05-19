<template>
  <app-article-form
    :initial-values="initialValues"
    :errors="validationErrors"
    :is-submitting="isSubmitting"
    @articleSubmit="onSubmit">
  </app-article-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import AppArticleForm from '@/components/article/ArticleForm.vue';
import { computed } from '@vue/runtime-core';
import { useRouter } from 'vue-router';

import { Article } from '@/entities/article';
import { useCreateArticleStore } from '@/stores/createArticle';

export default defineComponent({
  name: 'AppCreateArticle',
  components: {
    AppArticleForm,
  },
  setup() {
    const store = useCreateArticleStore();
    const router = useRouter();

    const initialValues = new Article();

    const onSubmit = (article: Article) => {
      store
        .createArticle(article)
        .then(article => {
          router.push({ name: 'article', params: { slug: article.slug }});
        });
    };

    return {
      initialValues,
      validationErrors: computed(() => store.validationErrors),
      isSubmitting: computed(() => store.isSubmitting),
      onSubmit
    };
  }
});
</script>