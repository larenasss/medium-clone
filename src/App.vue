<template>
  <app-top-bar></app-top-bar>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppTopBar from '@/components/ui/TopBar.vue';
import { onMounted } from '@vue/runtime-core';

import { useAuthUserStore } from '@/stores/auth';

export default defineComponent({
  name: 'App',
  components: { AppTopBar },
  setup() {
    const store = useAuthUserStore();
    onMounted(() => store.getCurrentUser());
  }
});
</script>
