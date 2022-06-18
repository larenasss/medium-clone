import { useAuthUserStore } from "@/stores/auth";
import { getToken } from '@/service/jwtService';

import { Middleware, RouterContext } from "./types";

export default function auth(context: RouterContext, nextMiddleware: Middleware) {
  debugger;
  const authStore = useAuthUserStore();
  if (!authStore.isLoggedIn) {
    const token = getToken();
    if (!token) {
      context.next('/');
    }
  }
  return nextMiddleware(context, nextMiddleware);
}

export function test(context: RouterContext, nextMiddleware: Middleware) {
  debugger;
  return nextMiddleware(context, nextMiddleware);
}
