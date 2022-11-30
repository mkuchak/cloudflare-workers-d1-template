import { HttpError } from "@/utils/HttpError";
import { Context, Hono, Next } from "hono";
import { StatusCode } from "hono/utils/http-status";
import { Http } from "./Http";

export class HonoHttp implements Http {
  private readonly router: any;

  constructor() {
    this.router = new Hono();

    // middleware to standardize the request data extraction on the controllers
    this.router.use("*", async (c: Context, next: Next) => {
      try {
        c.req.content = await c.req.json();
      } catch {
        c.req.content = {};
      }
      c.req.cookies = c.req.cookie();
      c.req.params = c.req.param();
      c.req.query = c.req.query();
      await next();
    });

    // error handling middleware
    this.router.onError((e: HttpError, c: Context) => {
      c.status(e.status as StatusCode);
      return c.json({ error: e.message });
    });

    // TODO: add CORS middleware
    // TODO: add rate limiting middleware
    // TODO: add observability/logging middleware
    // TODO: check a way for this adapter to cache some routes
  }

  join(...handlers: any[]): Promise<void> {
    return this.router.use(...handlers);
  }

  on(method: string, path: string, ...handlers: any[]): Promise<void> {
    const callback = handlers.pop();

    return this.router[method](
      path,
      ...handlers,
      async (c: Context): Promise<Response> => {
        const { status, payload } = await callback(c.req, c.res);

        c.status(status);
        return c.json(payload);
      }
    );
  }

  async start(request: Request, env: Env, ctx: ExecutionContext) {
    return await this.router.fetch(request, env, ctx);
  }
}
