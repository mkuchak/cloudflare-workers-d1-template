export interface IGraphQL {
  mountServer(): void;
  setTypeDefs(typeDefs: any): void;
  applyMiddleware(method: string, name: string, ...handlers: any): void;
  on(method: string, name: string, ...handlers: any): Promise<void>;
  start?(request: Request, env: Env, ctx: ExecutionContext): Promise<Response>;
  listen?(port: number): Promise<void>;
}
