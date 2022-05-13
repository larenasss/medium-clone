import { RootState } from "@/store/types";
import { ActionTree } from "vuex";
import { AuthState } from "@/store/modules/auth/types";
import authApi from '@/api/auth';
import { mytationTypes, actionsTypes } from '@/store/modules/auth/types';
import { setItem } from '@/helpers/persistanceStorage';
import { UserProfile } from "@/entities/user";

export const actions: ActionTree<AuthState, RootState> = {
  [actionsTypes.register]: async ({ commit }, credentials: any) => {
      try {
        commit(mytationTypes.registerStart);
        const { data } = await authApi.register(credentials);
        setItem('accessToken', data.user.token);
        commit(mytationTypes.registerSuccess, data.user);
      } catch (e: any) {
        commit(mytationTypes.registerFailure, e.response.data.errors);
        throw e;
      }
    },
    [actionsTypes.login]: async ({ commit }, credentials: any) => {
      try {
        commit(mytationTypes.loginStart);
        const { data } = await authApi.login(credentials);
        setItem('accessToken', data.user.token);
        commit(mytationTypes.loginSuccess, data.user);
      } catch (e: any) {
        commit(mytationTypes.loginFailure, e.response.data.errors);
        throw e;
      }
    },
    [actionsTypes.getCurrentUser]: async ({ commit }: {commit: any}) => {
      try {
        commit(mytationTypes.getCurrentUserStart);
        const { data } = await authApi.getCurrentUser();
        commit(mytationTypes.getCurrentUserSuccess, data.user);
      } catch (e) {
        commit(mytationTypes.getCurrentUserFailure);
        throw e;
      }
    },
    [actionsTypes.updateCurrentUser]: async ({ commit }, currentUser: UserProfile) => {
      try {
        commit(mytationTypes.updateCurrentUserStart);
        const user = await authApi.updateCurrentUser(currentUser);
        commit(mytationTypes.updateCurrentUserSuccess, user);
      } catch (e: any) {
        console.dir(e);
        commit(mytationTypes.updateCurrentUserFailure, e.response.data.errors);
        throw e;
      }
    },
    [actionsTypes.logout]: async ({ commit }) => {
      try {
        setItem('accessToken', '');
        commit(mytationTypes.logout);
      } catch (e) {
        console.log(e);
        throw e;
      }
    }
};