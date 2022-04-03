<template>
  <div>
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
          <div class="pull-xs-right">ADD TO FAVORITES</div>
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
  </div>
</template>

<script>
import { computed, onMounted, watch } from '@vue/runtime-core';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';

import { actionsTypes } from '@/store/modules/feed';
import { limit } from '@/helpers/variables';

import { stringify, parseUrl } from 'query-string';

import AppPagination from '@/components/ui/PaginationsList';
import AppLoadingItem from '@/components/ui/LoadingItem.vue';
import AppErrorMessage from '@/components/errors/ErrorMessage.vue';
import AppTagsList from '@/components/ui/TagsList.vue';

export default {
  name: 'AppFeedItem',
  components: {
    AppPagination,
    AppLoadingItem,
    AppErrorMessage,
    AppTagsList
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

    const offset = computed(() => currentPage.value * limit - limit);

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

    onMounted(() => {
      fetchFeed();
    });

    const currentPage = computed(() => Number(route.query.page || '1'));

    watch(currentPage, () => {
      fetchFeed();
    });

    return {
      isLoading: computed(() => store.state.feed.isLoading),
      feed: computed(() => store.state.feed.data),
      error: computed(() =>  store.state.feed.error),
      currentPage,
      limit,
      baseUrl: computed(() => route.path)
    };
  }
};
</script>
