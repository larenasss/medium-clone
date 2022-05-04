<template>
  <div class="article-page" v-if="article">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <div class="article-meta">
          <app-article-user-info :article="article"></app-article-user-info>
        </div>
      </div>
    </div>
    <div class="container page">
      <app-loading-item v-if="isLoading" />
      <app-error-message v-if="error" :message="error" />
      <div class="row article-content">
        <div class="col-xs-12">
          <div>
            <p>{{ article.body }}</p>
          </div>
          <app-tags-list :tags="article.tagList"></app-tags-list>
        </div>
      </div>
      <hr>
      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <div class="article-actions">
            <app-article-user-info :article="article"></app-article-user-info>
          </div>
          <app-add-comment-form
            @addComment="addComment"
            :is-submitting="isSubmittingAddComment"
            :errors="validationErrors"></app-add-comment-form>
          <app-comment-list :slug="article.slug"></app-comment-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from '@vue/reactivity';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

import { actionsTypes as articleActionsTypes } from '@/store/modules/article/types';
import { actionsTypes as commentsActionsTypes } from '@/store/modules/comments';
import { useGetStateLoadingByView } from '@/use/getStateLoadingByView';

import AppLoadingItem from '@/components/ui/LoadingItem.vue';
import AppErrorMessage from '@/components/errors/ErrorMessage';
import AppTagsList from '@/components/ui/TagsList';
import AppCommentList from '@/components/comments/CommentList';
import AppAddCommentForm from '@/components/comments/AddCommentForm';
import AppArticleUserInfo from '@/components/article/ArticleUserInfo';
import { key } from '@/store';

export default {
  name: 'AppArticleItem',
  components: {
    AppLoadingItem,
    AppErrorMessage,
    AppTagsList,
    AppCommentList,
    AppAddCommentForm,
    AppArticleUserInfo
  },
  setup() {
    const store = useStore(key);
    const route = useRoute();
    const router = useRouter();

    const { isLoading, data: article, error  } = useGetStateLoadingByView('article');

    const isSubmittingAddComment = ref(false);

    store.dispatch(articleActionsTypes.getArticle, { slug: route.params.slug });

    const addComment = commentInput => {
      isSubmittingAddComment.value = true;
      store
        .dispatch(commentsActionsTypes.addComment,
          { slugArticle: route.params.slug , commentInput })
        .then(() => isSubmittingAddComment.value = false)
        .catch(() => isSubmittingAddComment.value = false);
    };

    const deleteArticle = () => {
      store
        .dispatch(articleActionsTypes.deleteArticle, { slug: route.params.slug })
        .then(() => {
          router.push({ name: 'globalFeed' });
        });
    };

    return {
      isLoading,
      error,
      article,
      isSubmittingAddComment,
      validationErrors: computed(() => store.state.comments.validationErrors),
      deleteArticle,
      addComment,
    };
  }
};
</script>

<style lang="scss">
  .article-meta {
    display: flex;
  }

  .article-page .card .comment-author {
    vertical-align: baseline;
  }

  .article-actions {
    display: flex;
    justify-content: center;
  }
</style>