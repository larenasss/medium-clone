export interface AuthState {
  isSubmitting: boolean,
  isLoading: boolean,
  currentUser: null,
  validationErrors: null,
  isLoggedIn: null | boolean
}

const MODULE_NAME = 'auth';

export const gettersTypes = {
  currentUser: `[${MODULE_NAME}] currentUser`,
  isLoggedIn: `[${MODULE_NAME}] isLoggedIn`,
  isAnonymous: `[${MODULE_NAME}] isAnonymous`
};

export const mytationTypes = {
  registerStart: `[${MODULE_NAME}] registerStart`,
  registerSuccess: `[${MODULE_NAME}] registerSuccess`,
  registerFailure: `[${MODULE_NAME}] registerFailure`,

  loginStart: `[${MODULE_NAME}] loginStart`,
  loginSuccess: `[${MODULE_NAME}] loginSuccess`,
  loginFailure: `[${MODULE_NAME}] loginFailure`,

  getCurrentUserStart: `[${MODULE_NAME}] getCurrentUserStart`,
  getCurrentUserSuccess: `[${MODULE_NAME}] getCurrentUserSuccess`,
  getCurrentUserFailure: `[${MODULE_NAME}] getCurrentUserFailure`,

  updateCurrentUserStart: `[${MODULE_NAME}] updateCurrentUserStart`,
  updateCurrentUserSuccess: `[${MODULE_NAME}] updateCurrentUserSuccess`,
  updateCurrentUserFailure: `[${MODULE_NAME}] updateCurrentUserFailure`,

  logout: `[${MODULE_NAME}] logout`
};

export const actionsTypes = {
  register: `[${MODULE_NAME}] register`,
  login: `[${MODULE_NAME}] login`,
  getCurrentUser: `[${MODULE_NAME}] getCurrentUser`,
  updateCurrentUser: `[${MODULE_NAME}] updateCurreUser`,
  logout: `[${MODULE_NAME}] logout`
};