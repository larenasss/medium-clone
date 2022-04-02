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

<script>
export default {
  name: 'AppTagsList',
  props: {
    tags: {
      type: Array,
      required: true
    }
  }
};
</script>