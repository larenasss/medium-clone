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
        <app-user-info :user="article.author" :date="dateString(article.createdAt)"></app-user-info>
        <div class="pull-xs-right">
          <app-add-to-favorites
            :is-favorited="article.favorited"
            :article-slug="article.slug"
            :favorites-count="article.favoritesCount"
            @handleLike=handleLike
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

<script lang="ts">
import { defineComponent } from 'vue';

import { computed, onMounted, watch } from '@vue/runtime-core';
import { useRoute } from 'vue-router';

import { limit } from '@/helpers/variables';

import { convertDateJsonToDate } from '@/helpers/dateConverter';

import { stringify, parseUrl } from 'query-string';

import AppPagination from '@/components/ui/PaginationsList.vue';
import AppLoadingItem from '@/components/ui/LoadingItem.vue';
import AppErrorMessage from '@/components/errors/ErrorMessage.vue';
import AppTagsList from '@/components/ui/TagsList.vue';
import AppAddToFavorites from '@/components/ui/AddToFavorites.vue';
import AppUserInfo from '@/components/userProfile/UserInfo.vue';
import { useFeedStore } from '@/stores/feed';
import { ReturnLike } from '@/components/ui/types';

export default defineComponent({
  name: 'AppFeedItem',
  components: {
    AppPagination,
    AppLoadingItem,
    AppErrorMessage,
    AppTagsList,
    AppAddToFavorites,
    AppUserInfo
  },
  props: {
    apiUrl: {
      type: String,
      requred: true
    }
  },
  setup(props) {
    const route = useRoute();
    const store = useFeedStore();

    const currentPage = computed(() => Number(route.query.page || '1'));
    const offset = computed(() => currentPage.value * limit - limit);
    const baseUrl = computed(() => route.path);

    onMounted(() => fetchFeed());
    watch(currentPage, () => fetchFeed());
    watch(() => props.apiUrl, () => fetchFeed());

    const fetchFeed = () => {
      const parsedUrl = parseUrl(props.apiUrl ?? '');
      const stringifiedParams = stringify({
        limit,
        offset: offset.value,
        ...parsedUrl.query
      });
      const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
      store.getFeed({ apiUrl: apiUrlWithParams });
    };

    const dateString = (createdAt?: string) => {
      if (typeof (createdAt) === 'string') {
        return convertDateJsonToDate(createdAt)?.toLocaleString();
      } else {
        return new Date().toLocaleString();
      }
    };

    const handleLike = (returnLike: ReturnLike) => {
      store.$patch((store) => {
        if (store.data) {
          const article = store.data.articles.find(a => a.slug == returnLike.slug);
          article!.favorited = returnLike.isFavorited;
          article!.favoritesCount = returnLike.favoritesCount;
        }
      });
    };

    return {
      isLoading: computed(() => store.isLoading),
      feed: computed(() => store.data),
      error: computed(() => store.error),
      currentPage,
      limit,
      baseUrl,
      dateString,
      handleLike
    };
  }
});
</script>

<style lang="scss" scoped>
  .article-meta {
    justify-content: space-between;
  }
</style>
