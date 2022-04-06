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

<script>
import { computed, reactive } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

import AppValidationErrors from "@/components/errors/ValidationErrors";
import { actionsTypes } from "@/store/modules/auth";

export default {
  name: "AppLoginPage",
  setup() {
    const store = useStore();
    const router = useRouter();

    const user = reactive({
      email: "",
      password: "",
    });

    const isSubmitting = computed(() => store.state.auth.isSubmitting);
    const validationErrors = computed(() => store.state.auth.validationErrors);

    const onSubmit = () => {
      store
        .dispatch(actionsTypes.login, { user })
        .then(() => router.push({ name: 'globalFeed' }))
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
};
</script>

