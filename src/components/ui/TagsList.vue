<template>
  <ul v-if="tags.length" class="tag-list">
    <li
      v-for="tag in tags"
      :key="tag"
      class="tag-default tag-pill tag-outline ng-binding ng-scope"
    >
    {{ tag }}
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppTagsList',
  props: {
    tags: {
      type: Array,
      required: true
    }
  }
});
</script>