import { useAuthUserStore } from "@/stores/auth";
import { getToken } from '@/service/jwtService';

import { MiddlewareParams } from "./types";

export default function auth({ next, nextMiddleware }: MiddlewareParams) {
  const authStore = useAuthUserStore();
  if (!authStore.isLoggedIn) {
    const token = getToken();
    if (!token) {
      next('/');
    }
  }
  return nextMiddleware(next, nextMiddleware);
}