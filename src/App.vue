<template>
  <app-top-bar></app-top-bar>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppTopBar from '@/components/ui/TopBar.vue';
import { onMounted } from '@vue/runtime-core';

import { actionsTypes } from '@/store/modules/auth/types';
import { key } from '@/store/index';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'App',
  components: { AppTopBar },
  setup() {
    const store = useStore(key);

    onMounted(() => {
      store.dispatch(actionsTypes.getCurrentUser);
    });
  }
});
</script>
