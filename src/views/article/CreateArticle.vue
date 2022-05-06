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
import { useStore } from 'vuex';
import { computed } from '@vue/runtime-core';

import { actionsTypes  } from '@/store/modules/createArticle/types';
import { useRouter } from 'vue-router';

import { Article } from '@/entities/article';
import { key } from '@/store';

export default defineComponent({
  name: 'AppCreateArticle',
  components: {
    AppArticleForm,
  },
  setup() {
    const store = useStore(key);
    const router = useRouter();

    const initialValues = new Article();

    const onSubmit = (article: Article) => {
      store
        .dispatch(actionsTypes.createArticle, article)
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
});
</script>