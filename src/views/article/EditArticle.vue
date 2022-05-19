<template>
  <app-loading-item v-if="isLoading"></app-loading-item>
  <app-article-form
    v-if="initialValues"
    :initial-values="initialValues"
    :errors="validationErrors"
    :is-submitting="isSubmitting"
    @articleSubmit="onSubmit"
  >
  </app-article-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import AppArticleForm from "@/components/article/ArticleForm.vue";
import AppLoadingItem from "@/components/ui/LoadingItem.vue";
import { computed, onMounted } from "@vue/runtime-core";

import { useRoute, useRouter } from "vue-router";

import { Article } from '@/entities/article';
import { useEditArticleStore } from '@/stores/editArticle';

export default defineComponent({
  name: "AppEditArticle",
  components: {
    AppArticleForm,
    AppLoadingItem
  },
  setup() {
    const store = useEditArticleStore();
    const router = useRouter();
    const route = useRoute();

    const article = computed(() => store.article);

    const initialValues = computed(() => {
      if (!article.value) {
        return null;
      }

      return new Article(article.value);
    });

    onMounted(() => {
      store.getArticle({
        slug: route.params.slug as string
      });
    });

    const onSubmit = (articleInput: any) => {
      store
        .updateArticle({ slug: route.params.slug as string, articleInput })
        .then(article => {
          router.push({ name: "article", params: { slug: article.slug } });
        });
    };

    return {
      initialValues,
      validationErrors: computed(() => store.validationErrors),
      isSubmitting: computed(() => store.isSubmitting),
      isLoading: computed(() => store.isLoading),
      onSubmit,
      article
    };
  },
});
</script>