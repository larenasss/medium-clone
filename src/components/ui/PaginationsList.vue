<template>
  <ul class="pagination">
    <li
      v-for="page in pages"
      :key="page" class="page-item"
      :class="{'active': currentPage === page}"
    >
      <router-link
        :to="{path: url, query: {page: page}}"
        class="page-link"
      >
        {{ page }}
      </router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { computed } from '@vue/runtime-core';
import { range } from '@/helpers/utils';

export default defineComponent({
  name: 'AppPagination',
  props: {
    total: {
      type: Number,
      requred: true
    },
    limit: {
      type: Number,
      requred: true
    },
    currentPage: {
      type: Number,
      requred: true
    },
    url: {
      type: String,
      requred: true
    },
  },
  setup(props) {
    const pages = computed(() => {
      const pagesCount = Math.ceil((props.total ?? 0) / (props.limit ?? 0));
      return range(1, pagesCount);
    });

    return {
      pages
    };
  }
});
</script>