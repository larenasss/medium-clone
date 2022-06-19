import { Middleware, RouterContext } from "./types";

function middlewarePipeline(context: RouterContext, middlewares: Middleware[], index: number) {
  const nextMiddleware = middlewares[index];
  if (!nextMiddleware) {
    return context.next;
  }
  return () => {
    const nextPipeline = middlewarePipeline(context, middlewares, index + 1);
    nextMiddleware(context, nextPipeline);
  };
}

export default middlewarePipeline;