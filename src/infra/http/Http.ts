export interface Http {
  join(...handlers: any[]): Promise<void>;
  on(method: string, path: string, ...handlers: any[]): Promise<void>;
  listen(request: Request, env: Env, ctx: ExecutionContext): Promise<Response>;
}
