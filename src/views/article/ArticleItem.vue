<template>
  <div class="article-page" v-if="article">
    <div class="banner">
      <div class="container">
        <h1>{{ article.title }}</h1>
        <div class="article-meta d-flex">
          <app-user-info :user="article.author" :date="convertDateJsonToDate(article.createdAt).toLocaleString()"></app-user-info>
          <span v-if="isAuthor">
            <router-link
              class="btn btn-outline-secondary btn-sm"
              :to="{ name: 'editArticle', params: { slug: article.slug } }"
            >
              <i class="ion-edit" />
              Edit Article
            </router-link>
            &nbsp;
            <button class="btn btn-outline-danger btn-sm" @click="deleteArticle">
              <i class="ion-trash-a" />
              Delete Article
            </button>
          </span>
          <span v-else>
            <app-buttons-control :article="article"></app-buttons-control>
          </span>
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
      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
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
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

import { actionsTypes as articleActionsTypes } from '@/store/modules/article';
import { actionsTypes as commentsActionsTypes } from '@/store/modules/comments';
//import { gettersTypes as authGettersTypes } from '@/store/modules/auth';
import { useGetStateLoadingByView } from '@/use/getStateLoadingByView';
import { useGetUserProfileState } from '@/use/userProfile/getUserProfileState';

import { convertDateJsonToDate } from '@/helpers/dateConverter';

import AppLoadingItem from '@/components/ui/LoadingItem.vue';
import AppErrorMessage from '@/components/errors/ErrorMessage';
import AppTagsList from '@/components/ui/TagsList';
import AppCommentList from '@/components/comments/CommentList';
import AppAddCommentForm from '@/components/comments/AddCommentForm';
import AppUserInfo from '@/components/userProfile/UserInfo';
import AppButtonsControl from '@/components/article/ButtonsControl';

export default {
  name: 'AppArticleItem',
  components: {
    AppLoadingItem,
    AppErrorMessage,
    AppTagsList,
    AppCommentList,
    AppAddCommentForm,
    AppUserInfo,
    AppButtonsControl
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    const { isLoading, data: article, error  } = useGetStateLoadingByView('article');

    const author = computed(() => {
      if (!article.value) return;
      return article.value.author;
    });

    const { isCurrentUserProfile: isAuthor } = useGetUserProfileState(author);

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
      isAuthor,
      isSubmittingAddComment,
      validationErrors: computed(() => store.state.comments.validationErrors),
      deleteArticle,
      addComment,
      convertDateJsonToDate,
      author
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
</style>