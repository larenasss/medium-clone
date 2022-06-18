function middlewarePipeline(context: any, middlewares: any, index: number) {
  const nextMiddleware = middlewares[index];
  if (!nextMiddleware) {
    console.log(context.next);
    return context.next();
  }
  return () => {
    const nextPipeline = middlewarePipeline(context, middlewares, index + 1);
    nextMiddleware(context, nextPipeline);
  };
}

export default middlewarePipeline;