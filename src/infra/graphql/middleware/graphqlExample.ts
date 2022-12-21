// import { AppError } from "@/utils/AppError";

export const graphqlExample = (message: string) => {
  return async (
    resolve: any,
    parent: any,
    args?: any,
    context?: any,
    info?: any
  ) => {
    // throw new AppError(message);
    console.log(message);
    const contextWithMessage = { message, ...context };

    return resolve(parent, args, contextWithMessage, info);
  };
};
