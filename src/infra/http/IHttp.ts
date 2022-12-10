export interface IHttp {
  join(...handlers: any[]): Promise<void>;
  on(method: string, path: string, ...handlers: any[]): Promise<void>;
  start?(request: Request, env: Env, ctx: ExecutionContext): Promise<Response>;
  listen?(port: number): Promise<void>;
}
