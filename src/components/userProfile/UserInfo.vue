<template>
  <div class="user-info" v-if="user">
    <router-link class="comment-author" :to="{name: 'userProfileMyPosts', params: {userSlug: user.username}}">
      <img class="comment-author-img" :src="user.image" />
    </router-link>
    <div class="info">
      <router-link class="comment-author"
        :to="{
          name: 'userProfileMyPosts',
          params: {userSlug: user.username}
        }"
      >
        {{ user.username }}
      </router-link>
      <span v-if="date" class="date">{{ date }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppUserInfo',
  props: {
    user: {
      type: Object,
      requred: true
    },
    date: {
      type: String,
      requred: false
    }
  }
});
</script>