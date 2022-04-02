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
          <span>
            <router-link
              class="btn btn-outline-secondary btn-sm"
              :to="{ name: 'editArticle', params: { slug: article.slug } }"
            >
              <i class="ion-edit" />
              Edit Article
            </router-link>
            <button class="btn btn-outline-danger btn-sm">
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
          TAG LIST IS HERE
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppLoadingItem from '@/components/LoadingItem.vue';
import AppErrorMessage from '@/components/ErrorMessage.vue';

import { actionsTypesExport } from '@/store/modules/article';

import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
export default {
  name: 'AppArticleItem',
  components: {
    AppLoadingItem,
    AppErrorMessage
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    onMounted(() => {
      store.dispatch(actionsTypesExport.getArticle, { slug: route.params.slug });
    });

    return {
      isLoading: computed(() => store.state.article.isLoading),
      article: computed(() => store.state.article.data),
      error: computed(() =>  store.state.article.error),
    };
  }
};
</script>