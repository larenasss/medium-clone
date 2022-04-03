<template>
  <app-loading-item v-if="isLoading" />
  <app-error-message v-if="error" />

  <div v-if="feed">
    <div
      class="article-preview"
      v-for="(article, index) in feed.articles"
      :key="index"
    >
      <div class="article-meta">
        <router-link
          :to="{name: 'userProfile', params: {slug: article.author.username}}"
        >
          <img :src="article.author.image" />
        </router-link>
        <div class="info">
          <router-link
            :to="{
              name: 'userProfile',
              params: {slug: article.author.username}
            }"
          >
            {{ article.author.username }}
          </router-link>
          <span class="date">{{ article.createdAt }}</span>
        </div>
        <div class="pull-xs-right">
          <app-add-to-favorites
            :is-favorited="article.favorited"
            :article-slug="article.slug"
            :favorites-count="article.favoritesCount"
          >
          </app-add-to-favorites>
        </div>
      </div>
      <router-link
        :to="{name: 'article', params: {slug: article.slug}}"
        class="preview-link"
      >
        <h1>{{ article.title }}</h1>
        <p>{{ article.description }}</p>
        <span>Read more...</span>
        <app-tags-list :tags="article.tagList"></app-tags-list>
      </router-link>
    </div>
    <app-pagination
      :total="feed.articlesCount"
      :limit="limit"
      :current-page="currentPage"
      :url="baseUrl"></app-pagination>
  </div>
</template>

<script>
import { computed, onMounted, watch } from '@vue/runtime-core';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

import { actionsTypes } from '@/store/modules/feed';
import { limit } from '@/helpers/variables';
import { useGetStateLoadingByView } from '@/use/getStateLoadingByView';

import { stringify, parseUrl } from 'query-string';

import AppPagination from '@/components/ui/PaginationsList';
import AppLoadingItem from '@/components/ui/LoadingItem';
import AppErrorMessage from '@/components/errors/ErrorMessage';
import AppTagsList from '@/components/ui/TagsList';
import AppAddToFavorites from '@/components/ui/AddToFavorites';

export default {
  name: 'AppFeedItem',
  components: {
    AppPagination,
    AppLoadingItem,
    AppErrorMessage,
    AppTagsList,
    AppAddToFavorites
  },
  props: {
    apiUrl: {
      type: String,
      requred: true
    }
  },
  setup(props) {
    const route = useRoute();
    const store = useStore();

    const currentPage = computed(() => Number(route.query.page || '1'));
    const offset = computed(() => currentPage.value * limit - limit);
    const { isLoading, data: feed, error  } = useGetStateLoadingByView('feed');
    const baseUrl = computed(() => route.path);

    onMounted(() => {
      fetchFeed();
    });

    watch(currentPage, () => fetchFeed());
    watch(() => props.apiUrl, () => {
      console.log(1);
      fetchFeed();
    });

    const fetchFeed = () => {
      const parsedUrl = parseUrl(props.apiUrl);
      const stringifiedParams = stringify({
        limit,
        offset: offset.value,
        ...parsedUrl.query
      });
      const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
      store.dispatch(actionsTypes.getFeed, { apiUrl: apiUrlWithParams });
    };

    return {
      isLoading,
      feed,
      error,
      currentPage,
      limit,
      baseUrl
    };
  }
};
</script>
