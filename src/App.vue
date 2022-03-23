<template>
  <app-top-bar></app-top-bar>
  <router-view></router-view>
</template>

<script>
import AppTopBar from '@/components/TopBar';
export default {
  name: 'App',
  components: { AppTopBar }
};
</script>
