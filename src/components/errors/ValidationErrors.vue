<template>
  <ul class="error-messages">
    <li
      v-for="errorMessage in errorMessages"
      :key="errorMessage"
    >
    {{ errorMessage }}
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { computed } from '@vue/runtime-core';
export default defineComponent({
  name: 'AppValidationErrors',
  props: {
    validationErrors: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const errorMessages = computed(() => {
      return Object.keys(props.validationErrors).map(name => {
        const message = props.validationErrors[name].join(', ');
        return `${name} ${message}`;
      });
    });

    return {
      errorMessages
    };
  }
});
</script>