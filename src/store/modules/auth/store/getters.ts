import { GetterTree } from "vuex";
import { RootState } from '@/store/types';
import { AuthState, gettersTypes } from '@/store/modules/auth/types';

export const getters: GetterTree<AuthState, RootState> = {
  [gettersTypes.currentUser]: (state) => state.currentUser,
  [gettersTypes.isLoggedIn]: (state) => Boolean(state.isLoggedIn),
  [gettersTypes.isAnonymous]: (state) => state.isLoggedIn === false
};