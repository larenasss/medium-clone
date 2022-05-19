<template>
  <div class="article-page" v-if="article">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <div class="article-meta">
          <app-article-user-info>
          </app-article-user-info>
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
            <app-article-user-info>
            </app-article-user-info>
          </div>
          <app-add-comment-form
            @addComment="addComment"
            :is-submitting="isSubmittingAddComment"
            :errors="validationErrors"></app-add-comment-form>
          <app-comment-list :slug="article.slug ?? ''"></app-comment-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { computed, ref } from '@vue/reactivity';
import { useRoute } from 'vue-router';

import AppLoadingItem from '@/components/ui/LoadingItem.vue';
import AppErrorMessage from '@/components/errors/ErrorMessage.vue';
import AppTagsList from '@/components/ui/TagsList.vue';
import AppCommentList from '@/components/comments/CommentList.vue';
import AppAddCommentForm from '@/components/comments/AddCommentForm.vue';
import AppArticleUserInfo from '@/components/article/ArticleUserInfo.vue';

import { useCommentsStore } from '@/stores/comments';
import { useArticleStore } from '@/stores/article';
import { Comment } from '@/entities/comment';
import { Article } from '@/entities/article';

export default defineComponent({
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
    const commentStore = useCommentsStore();
    const articleStore = useArticleStore();
    const route = useRoute();

    const isSubmittingAddComment = ref(false);

    articleStore.getArticle( { slug: route.params.slug as string });

    const addComment = (comment: Comment) => {
      isSubmittingAddComment.value = true;
      commentStore
        .addComment({ slugArticle: route.params.slug , comment })
        .then(() => isSubmittingAddComment.value = false)
        .catch(() => isSubmittingAddComment.value = false);
    };

    return {
      isLoading: computed(() => articleStore.isLoading),
      error: computed(() => articleStore.error),
      article: computed<Article>(() => articleStore.data as Article),
      isSubmittingAddComment,
      validationErrors: computed(() => commentStore.error),
      addComment,
    };
  }
});
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