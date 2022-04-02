<template>
  <div class="article-page">
    <div class="banner">
      <div class="container" v-if="article">
        <h1>{{ article.title }}</h1>
        <div class="article-meta">
          <router-link
            :to="{
              name: 'userProfile',
              params: { slug: article.author.username },
            }"
          >
            <img :src="article.author.image" />
          </router-link>
          <div class="info">
            <router-link
              :to="{
                name: 'userProfile',
                params: { slug: article.author.username },
              }"
            >
              {{ article.author.username }}
            </router-link>
            <span class="date">{{ article.createdAt }}</span>
          </div>
          <span v-if="isAuthor">
            <router-link
              class="btn btn-outline-secondary btn-sm"
              :to="{ name: 'editArticle', params: { slug: article.slug } }"
            >
              <i class="ion-edit" />
              Edit Article
            </router-link>
            <button class="btn btn-outline-danger btn-sm" @click="deleteArticle">
              <i class="ion-trash-a" />
              Delete Article
            </button>
          </span>
        </div>
      </div>
    </div>
    <div class="container page">
      <app-loading-item v-if="isLoading" />
      <app-error-message v-if="error" :message="error" />
      <div class="row article-content" v-if="article">
        <div class="col-xs-12">
          <div>
            <p>{{ article.body }}</p>
          </div>
          <app-tags-list :tags="article.tagList"></app-tags-list>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { actionsTypesExport as actionsTypesExportArticle } from '@/store/modules/article';
import { gettersTypesExport as gettersTypesExportAuth } from '@/store/modules/auth';

import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';

import AppLoadingItem from '@/components/ui/LoadingItem.vue';
import AppErrorMessage from '@/components/errors/ErrorMessage';
import AppTagsList from '@/components/ui/TagsList';

export default {
  name: 'AppArticleItem',
  components: {
    AppLoadingItem,
    AppErrorMessage,
    AppTagsList
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();

    onMounted(() => {
      store.dispatch(actionsTypesExportArticle.getArticle, { slug: route.params.slug });
    });

    const deleteArticle = () => {
      store.dispatch(actionsTypesExportArticle.deleteArticle, { slug: route.params.slug })
        .then(() => { router.push({name: 'globalFeed'}); });
    };

    const currentUser = computed(() => store.getters[gettersTypesExportAuth.currentUser]);
    const article = computed(() => store.state.article.data);

    return {
      isLoading: computed(() => store.state.article.isLoading),
      error: computed(() =>  store.state.article.error),
      article,
      isAuthor: computed(() => {
        if (!currentUser.value || !article.value) {
          return false;
        }
        return currentUser.value.username === article.value.author.username;
      }),
      deleteArticle
    };
  }
};
</script>