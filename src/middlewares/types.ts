import { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export type Middleware = (context: RouterContext) => Middleware | NavigationGuardNext;

export type RouterContext = {
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
}