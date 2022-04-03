<template>
  <div class="settings-page" v-if="currentUser">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Settings</h1>
          <app-validation-errors
            v-if="validationErrors"
            :validation-errors="validationErrors"
          />
          <form @submit.prevent="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="form.image"
                  placeholder="URL of profile image"
                />
              </fieldset>

              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="form.username"
                  placeholder="Username"
                />
              </fieldset>

              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  v-model="form.bio"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>

              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="form.email"
                  placeholder="Email"
                />
              </fieldset>

              <fieldset class="form-group">
                <input
                  type="password"
                  class="form-control form-control-lg"
                  v-model="form.password"
                  placeholder="New password"
                />
              </fieldset>
              <button
                type="submit"
                class="btn btn-lg btn-primary pull-xs-right"
                :disabled="isSubmitting"
              >
                Update settings
              </button>
            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger" @click="logout" type="text">
            Or cick here to logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import AppValidationErrors from '@/components/errors/ValidationErrors';

import {
  gettersTypesExport as authGettersTypesExport,
  actionsTypesExport as authActionsTypesExport
} from '@/store/modules/auth';

import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
export default {
  name: 'AppSettingsPage',
  components: {
    AppValidationErrors
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const currentUser = computed(() => store.getters[authGettersTypesExport.currentUser]);

    const form = computed(() => {
      return {
        username: currentUser.value.username,
        bio: currentUser.value.bio,
        image: currentUser.value.image,
        email: currentUser.value.email,
        password: ''
      };
    });

    const onSubmit = () => {
      store.dispatch(authActionsTypesExport.updateCurrentUser, {
        currentUserInput: form.value
      });
    };

    const logout = () => {
      store.dispatch(authActionsTypesExport.logout).then(() => {
        router.push({name: 'globalFeed'});
      });
    };

    return {
      isSubmitting: computed(() => store.state.settings.isSubmitting),
      validationErrors: computed(() => store.state.settings.validationErrors),
      currentUser,
      form,
      onSubmit,
      logout
    };
  }
};
</script>