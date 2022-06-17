import { NavigationGuardNext } from "vue-router";

export type Middleware = (next: NavigationGuardNext, nextMiddleware: Middleware) => Middleware | undefined;
export type MiddlewareParams = {
  next: NavigationGuardNext,
  nextMiddleware: Middleware
}