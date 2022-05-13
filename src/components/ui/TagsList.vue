<template>
  <ul v-if="tags.length" class="tag-list">
    <li
      v-for="tag in tags"
      :key="tag.value"
      class="tag-default tag-pill tag-outline ng-binding ng-scope"
    >
    {{ tag }}
    </li>
  </ul>
</template>

<script lang="ts">
import { Tag } from '@/entities/tag';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'AppTagsList',
  props: {
    tags: {
      type: Array as PropType<Array<Tag>>,
      required: true
    }
  }
});
</script>