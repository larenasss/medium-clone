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
                  :disabled="isSubmitting"
                  placeholder="URL of profile image"
                />
              </fieldset>

              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="form.username"
                  :disabled="isSubmitting"
                  placeholder="Username"
                />
              </fieldset>

              <fieldset class="form-group">
                <textarea
                  class="form-control form-control-lg"
                  v-model="form.bio"
                  :disabled="isSubmitting"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>

              <fieldset class="form-group">
                <input
                  type="text"
                  class="form-control form-control-lg"
                  v-model="form.email"
                  :disabled="isSubmitting"
                  placeholder="Email"
                />
              </fieldset>

              <fieldset class="form-group">
                <input
                  type="password"
                  class="form-control form-control-lg"
                  v-model="form.password"
                  :disabled="isSubmitting"
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
          <button class="btn btn-outline-danger" @click="logout">
            Or cick here to logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';

import AppValidationErrors from '@/components/errors/ValidationErrors.vue';

import {
  gettersTypes as authGettersTypes,
  actionsTypes as authActionsTypes
} from '@/store/modules/auth/types';

import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { key } from '@/store';
import { UserProfile } from '@/entities/user';

export default defineComponent({
  name: 'AppSettingsPage',
  components: {
    AppValidationErrors
  },
  setup() {
    const store = useStore(key);
    const router = useRouter();

    const currentUser = computed<UserProfile>(() => store.getters[authGettersTypes.currentUser]);

    const form = computed(() => new UserProfile(currentUser.value));

    const onSubmit = () => {
      store
        .dispatch(authActionsTypes.updateCurrentUser, form.value)
        .then(() => {
          router.push({
            name: 'userProfileMyPosts',
            params: {slug: currentUser.value.username}
          });
        });
    };

    const logout = () => {
      store
        .dispatch(authActionsTypes.logout)
        .then(() => {
          router.push({
            name: 'globalFeed'
          });
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
});
</script>