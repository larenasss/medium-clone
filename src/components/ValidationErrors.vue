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

<script>
import { computed } from '@vue/runtime-core';
export default {
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
};
</script>