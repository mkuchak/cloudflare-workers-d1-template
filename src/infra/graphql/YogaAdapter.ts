import { IGraphQL } from "@/infra/graphql/IGraphQL";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { applyMiddleware } from "graphql-middleware";
import { createYoga } from "graphql-yoga";

export class YogaAdapter implements IGraphQL {
  private yoga: any;
  public typeDefs: any = {};
  readonly resolvers: any = {};
  readonly middlewares: any = [];

  constructor(private server?: any) {}

  mountServer() {
    this.yoga = createYoga<Env & ExecutionContext>({
      schema: applyMiddleware(
        makeExecutableSchema({
          typeDefs: this.typeDefs,
          resolvers: this.resolvers,
        }),
        ...this.middlewares
      ),
      graphiql: true,
    });
  }

  setTypeDefs(typeDefs: any) {
    this.typeDefs = typeDefs;
  }

  applyMiddleware(method: string, name: string, ...handlers: any) {
    const type = method && method[0].toUpperCase() + method.slice(1);

    for (const handler of handlers) {
      if (!type || !name) {
        this.middlewares.push(handler);
      } else {
        this.middlewares.push({
          [type]: {
            [name]: handler,
          },
        });
      }
    }
  }

  async on(method: string, name: string, ...handlers: any): Promise<void> {
    const type = method[0].toUpperCase() + method.slice(1);
    const resolver = handlers.pop();

    if (handlers) {
      this.applyMiddleware(type, name, ...handlers);
    }

    this.resolvers[type] = {
      ...this.resolvers[type],
      [name]: async (_obj: any, args: any, context: any) => {
        const result = await resolver(args, context);

        return result;
      },
    };
  }

  async start(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    this.mountServer();
    return await this.yoga.fetch(request, env, ctx);
  }

  async listen(port: number): Promise<void> {
    if (!this.server) {
      throw new Error("Server not defined");
    }
    this.mountServer();
    this.server.on("request", this.yoga);
    this.server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
}
