import { useRoute } from 'vue-router';
import { computed } from '@vue/runtime-core';

export function useSetupUserProfilePage() {
  const route = useRoute();

  const userProfileSlug = computed(() => route.params.userSlug);

  const apiUrl = computed(() => {
    const isFavorites = route.path.includes('favorites');
    return isFavorites
      ? `/articles?favorited=${userProfileSlug.value}`
      : `/articles?author=${userProfileSlug.value}`;
  });

  return {
    apiUrl
  };
}