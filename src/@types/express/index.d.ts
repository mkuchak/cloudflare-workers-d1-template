declare namespace Express {
  export interface Request {
    content?: any;
    user?: any;
  }
}

declare module "express-async-errors" {}
