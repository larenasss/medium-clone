<template>
  <div class="article-meta d-flex">
    <app-user-info :user="article.author" :date="convertDateJsonToDate(article.createdAt).toLocaleString()"></app-user-info>
    <app-buttons-control :article="article"></app-buttons-control>
  </div>
</template>

<script>
import AppUserInfo from '@/components/userProfile/UserInfo';
import AppButtonsControl from '@/components/article/ButtonsControl';

import { convertDateJsonToDate } from '@/helpers/dateConverter';

export default {
  name: 'AppArticleUserInfo',
  props: {
    article: {
      type: Object,
      required: true,
    }
  },
  components: {
    AppUserInfo,
    AppButtonsControl,
  },
  setup() {
    return {
      convertDateJsonToDate
    };
  }
};
</script>