import { defineStore } from 'pinia';

interface SettingsState {
  isSubmitting: boolean,
  validationErrors: null
}

export const useSettingsStore = defineStore('settings', {
  state: (): SettingsState => ({
    isSubmitting: false,
    validationErrors: null
  })
});