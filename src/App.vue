<template>
  <app-top-bar></app-top-bar>
  <router-view :key="$route.fullPath"></router-view>
</template>

<script>
import AppTopBar from '@/components/ui/TopBar';
import { onMounted } from '@vue/runtime-core';

import { actionsTypesExport } from '@/store/modules/auth';
import { useStore } from 'vuex';

export default {
  name: 'App',
  components: { AppTopBar },
  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch(actionsTypesExport.getCurrentUser);
    });
  }
};
</script>
