// import { AppError } from "@/utils/AppError";
// import { StatusCodes } from "http-status-codes";

export const httpExample = (message: string) => {
  return async (request: Request) => {
    // throw new AppError(message, StatusCodes.BAD_REQUEST);
    console.log(message);
    // @ts-ignore (add custom metadata in ./src/@types/{hono,express}/index.d.ts)
    request.message = message;
  };
};
