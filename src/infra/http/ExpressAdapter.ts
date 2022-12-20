import { IHttp } from "@/infra/http/IHttp";
import { AppError } from "@/utils/AppError";
import type { Request, Response, NextFunction } from "express";
import express from "express";

export class ExpressAdapter implements IHttp {
  private readonly router: any;

  constructor() {
    this.router = express();

    // middleware to standardize the request data extraction on the controllers
    this.router.use(express.json());
    this.router.use(
      "*",
      async (req: Request, _res: Response, next: NextFunction) => {
        try {
          req.content = req.body;
        } catch {
          req.content = {};
        }
        next();
      }
    );

    // TODO: add CORS middleware
    // TODO: add rate limiting middleware
    // TODO: add observability/logging middleware
  }

  async join(...handlers: any[]): Promise<void> {
    return this.router.use(...handlers);
  }

  async on(method: string, path: string, ...handlers: any[]): Promise<void> {
    const callback = handlers.pop();

    return this.router[method](
      path,
      ...handlers,
      async (req: Request, res: Response): Promise<Response> => {
        const { status, json } = await callback(req);

        return res.status(status).json(json);
      }
    );
  }

  async listen(port: number): Promise<void> {
    // error handling middleware (must be the last one)
    this.router.use(
      (e: Error, _req: Request, res: Response, _next: NextFunction) => {
        if (e instanceof AppError) {
          return res.status(e.status).json({ error: e.message });
        }

        return res.status(500).json({ error: "Internal Server Error" });
      }
    );

    this.router.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
}
