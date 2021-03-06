<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <router-link :to="{ name: 'register' }">
              Need an account?
            </router-link>
          </p>
          <app-validation-errors
            :validation-errors="validationErrors"
            v-if="validationErrors"
          >
          </app-validation-errors>
          <form @submit.prevent="onSubmit">
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
              Sign In
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
import { useRouter } from "vue-router";

import AppValidationErrors from "@/components/errors/ValidationErrors.vue";
import { useAuthUserStore } from '@/stores/auth';
import { UserProfile } from '@/entities/user';
import { UserViewModel } from '@/models/user';
import mapper from '@/mapper/index';

export default defineComponent({
  name: "AppLoginPage",
  setup() {
    const store = useAuthUserStore();
    const router = useRouter();

    const user = reactive(new UserViewModel());

    const isSubmitting = computed(() => store.isSubmitting);
    const validationErrors = computed(() => store.validationErrors);

    const onSubmit = () => {
      const userProfile = mapper.map<UserViewModel, UserProfile>(user);
      store
        .login(userProfile)
        .then(() => router.push({
          name: 'globalFeed'
        }))
        .catch((e) => console.log(e));
    };

    return {
      onSubmit,
      isSubmitting,
      validationErrors,
      user,
    };
  },
  components: { AppValidationErrors },
});
</script>

