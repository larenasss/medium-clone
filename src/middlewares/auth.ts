import { useAuthUserStore } from "@/stores/auth";
import { getToken } from '@/service/jwtService';

import { Middleware, RouterContext } from "./types";

export default function auth(context: RouterContext) {
  debugger;
  const authStore = useAuthUserStore();
  if (!authStore.isLoggedIn) {
    const token = getToken();
    if (!token) {
      context.next('/');
    }
  }
  context.next({name: 'createArticle'});
}

export function test(context: RouterContext) {
  debugger;
  context.next({name: 'login'});
}