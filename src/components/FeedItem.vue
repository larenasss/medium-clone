<template>
  <div>
    <div v-if="isLoading">Loading...</div>
    <div v-if="errors">Something bad happed</div>

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
          TAG LIST
        </router-link>
      </div>
      <app-pagination
        :total="testData.total"
        :limit="testData.limit"
        :current-page="testData.currentPage"
        :url="testData.url"></app-pagination>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core';

import { actionsTypesExport } from '@/store/modules/feed';
import { useStore } from 'vuex';

import AppPagination from '@/components/PaginationsList';

export default {
  name: 'AppFeedItem',
  components: {
    AppPagination
  },
  props: {
    apiUrl: {
      type: String,
      requred: true
    }
  },
  setup(props) {
    const store = useStore();

    onMounted(() => {
      store.dispatch(actionsTypesExport.getFeed, { apiUrl: props.apiUrl });
    });

    const testData = {
      total: 500,
      limit: 10,
      currentPage: 5,
      url: '/tags/dragons'
    };

    return {
      isLoading: computed(() => store.state.feed.isLoading),
      feed: computed(() => store.state.feed.data),
      errors: computed(() =>  store.state.feed.errors),
      testData
    };
  }
};
</script>
