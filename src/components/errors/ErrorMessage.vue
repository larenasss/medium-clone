<template>
  <div>{{ message }}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "AppErrorMessage",
  props: {
    message: {
      type: String,
      required: false,
      default: 'Something went wrong'
    }
  }
});
</script>
