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
import { useStore } from "vuex";
import { computed, onMounted } from "@vue/runtime-core";

import { actionsTypes } from "@/store/modules/editArticle/types";
import { useRoute, useRouter } from "vue-router";

import { Article } from '@/entities/article';
import { key } from '@/store';

export default defineComponent({
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

      return new Article(article.value);
    });

    onMounted(() => {
      store.dispatch(actionsTypes.getArticle, {
        slug: route.params.slug
      });
    });

    const onSubmit = (articleInput: any) => {
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
});
</script>