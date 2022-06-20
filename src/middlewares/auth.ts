import { useAuthUserStore } from "@/stores/auth";
import { getToken } from '@/service/jwtService';

import { Middleware, RouterContext } from "./types";

export default function auth(context: RouterContext, nextMiddleware: Middleware) {
  const authStore = useAuthUserStore();
  if (!authStore.isLoggedIn) {
    const token = getToken();
    if (!token) {
      context.next('/');
    } else {
      return nextMiddleware();
    }
  } else {
    return nextMiddleware();
  }
}
