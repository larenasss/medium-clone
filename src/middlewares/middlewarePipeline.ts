import { NavigationGuardNext } from "vue-router";
import { Middleware, RouterContext } from "./types";

/* function middlewarePipeline(context: RouterContext, middlewares: Middleware[], index: number): Middleware | NavigationGuardNext {
  const nextMiddleware = middlewares[index];
  if (!nextMiddleware) {
    return context.next;
  }
  const nextPipeline = middlewarePipeline(context, middlewares, index + 1);
  return nextMiddleware(context, nextPipeline as Middleware);
}

export default middlewarePipeline; */