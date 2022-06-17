function middlewarePipeline(context: any, middlewares: any, index: number) {
  console.log(context);

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