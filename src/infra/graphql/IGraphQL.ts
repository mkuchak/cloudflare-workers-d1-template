export interface IGraphQL {
  setTypeDefs(typeDefs: any): void;
  on(method: string, name: string, resolver: any): Promise<void>;
  start?(request: Request, env: Env, ctx: ExecutionContext): Promise<Response>;
  listen?(port: number): Promise<void>;
}
