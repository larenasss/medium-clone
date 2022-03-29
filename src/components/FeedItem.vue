<template>
  <div>{{ apiUrl }}</div>
</template>

<script>
import { onMounted } from '@vue/runtime-core';

import { actionsTypesExport } from '@/store/modules/feed';
import { useStore } from 'vuex';

export default {
  name: 'AppFeedItem',
  props: {
    apiUrl: {
      type: String,
      requred: true
    }
  },
  setup(props) {
    const store = useStore();

    onMounted(() => {
      console.log('init feed');
      store.dispatch(actionsTypesExport.getFeed, { apiUrl: props.apiUrl });
    });
  }
};
</script>
