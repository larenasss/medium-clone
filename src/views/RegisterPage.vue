<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <!-- <router-link :to="{ name: 'login' }">
              Need an account?
            </router-link> -->
          </p>
          VALIDATION ERRORS
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

<script>
import { computed, reactive } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRouter } from 'vue-router';
export default {
  name: "AppRegister",
  setup() {
    const store = useStore();
    const router = useRouter();

    const user = reactive({
      username: '',
      email: '',
      password: ''
    });

    const isSubmitting = computed(() => store.state.auth.isSubmitting);

    const onSubmit = () => {
      store
        .dispatch("auth/register", user)
        .then(() => router.push({ name: 'home' }))
        .catch(e => console.log(e));
    };

    return {
      onSubmit,
      isSubmitting,
      user
    };
  },
};
</script>

<style></style>
