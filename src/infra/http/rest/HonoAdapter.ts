import { IRest } from "@/infra/http/rest/IRest";
import { AppError } from "@/utils/AppError";
import { Hono } from "hono";
import type { Context, Next } from "hono";
import type { StatusCode } from "hono/utils/http-status";

export class HonoAdapter implements IRest {
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
    this.router.onError((e: Error, c: Context) => {
      if (e instanceof AppError) {
        c.status(e.status as StatusCode);
        return c.json({ error: e.message });
      }

      c.status(500);
      return c.json({ error: "Internal Server Error" });
    });

    // TODO: add CORS middleware
    // TODO: add rate limiting middleware
    // TODO: add observability/logging middleware
    // TODO: check a way for this adapter to cache some routes
  }

  async join(...handlers: any[]): Promise<void> {
    return this.router.use(...handlers);
  }

  async on(method: string, path: string, ...handlers: any[]): Promise<void> {
    const callback = handlers.pop();

    return this.router[method](
      path,
      async (c: Context, next: Next) => {
        for (const handler of handlers) {
          await handler(c.req, c.res);
        }
        await next();
      },
      async (c: Context): Promise<Response> => {
        const { status, json } = await callback(c.req, c.res);
        // TODO: implement a way to set cookies, headers, etc.

        c.status(status);
        return c.json(json);
      }
    );
  }

  async start(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    return await this.router.fetch(request, env, ctx);
  }
}
