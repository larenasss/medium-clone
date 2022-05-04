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

<script>
import AppArticleForm from "@/components/article/ArticleForm";
import AppLoadingItem from "@/components/ui/LoadingItem";
import { useStore } from "vuex";
import { computed, onMounted } from "@vue/runtime-core";

import { actionsTypes } from "@/store/modules/editArticle";
import { useRoute, useRouter } from "vue-router";
import { key } from '@/store';

export default {
  name: "AppEditArticle",
  components: {
    AppArticleForm,
    AppLoadingItem
  },
  setup() {
    const store = useStore(key);
    const router = useRouter();
    const route = useRoute();

    const article = computed(() => store.state.editArticle.article);

    const initialValues = computed(() => {
      if (!article.value) {
        return null;
      }

      return {
        title: article.value.title,
        description: article.value.description,
        body: article.value.body,
        tagList: article.value.tagList.toString(),
      };
    });

    onMounted(() => {
      store.dispatch(actionsTypes.getArticle, {
        slug: route.params.slug
      });
    });

    const onSubmit = articleInput => {
      store
        .dispatch(actionsTypes.updateArticle, { slug: route.params.slug, articleInput })
        .then(article => {
          router.push({ name: "article", params: { slug: article.slug } });
        });
    };

    return {
      initialValues,
      validationErrors: computed(() => store.state.editArticle.validationErrors),
      isSubmitting: computed(() => store.state.editArticle.isSubmitting),
      isLoading: computed(() => store.state.editArticle.isLoading),
      onSubmit,
      article
    };
  },
};
</script>