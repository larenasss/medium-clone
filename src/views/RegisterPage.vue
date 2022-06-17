<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <router-link :to="{ name: 'login' }">
              Have an account?
            </router-link>
          </p>
          <app-validation-errors
            :validation-errors="validationErrors"
            v-if="validationErrors">
          </app-validation-errors>
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Username"
                v-model="user.username"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="text"
                placeholder="Email"
                v-model="user.email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
                v-model="user.password"
              />
            </fieldset>
            <button
              :disabled="isSubmitting"
              class="btn btn-lg btn-primary pull-xs-right"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { computed, reactive } from "@vue/runtime-core";
import { useRouter } from 'vue-router';

import AppValidationErrors from '@/components/errors/ValidationErrors.vue';

import { useAuthUserStore } from '@/stores/auth';
import { useUserProfileStore } from '@/stores/userProfile';
import { UserWithUserNameViewModel } from '@/models/user';
import { UserProfile } from '@/entities/user';
import mapper from '@/mapper';

export default defineComponent({
  name: "AppRegisterPage",
  setup() {
    const authStore = useAuthUserStore();
    const userProfileStore = useUserProfileStore();
    const router = useRouter();

    const user = reactive(new UserWithUserNameViewModel());

    const isSubmitting = computed(() => authStore.isSubmitting);
    const validationErrors = computed(() => authStore.validationErrors);

    const onSubmit = () => {
      const userProfile = mapper.map<UserWithUserNameViewModel, UserProfile>(user);
      userProfileStore
        .register(userProfile)
        .then(() => router.push({ name: 'globalFeed' }))
        .catch(e => console.log(e));
    };

    return {
      onSubmit,
      isSubmitting,
      validationErrors,
      user
    };
  },
  components: { AppValidationErrors }
});
</script>
