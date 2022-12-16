import { IGraphQL } from "@/infra/graphql/IGraphQL";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { createYoga } from "graphql-yoga";

export class YogaAdapter implements IGraphQL {
  private yoga: any;
  public typeDefs: any = {};
  readonly resolvers: any = { Query: {}, Mutation: {} };

  constructor(private server?: any) {}

  mountYoga() {
    this.yoga = createYoga<Env & ExecutionContext>({
      schema: makeExecutableSchema({
        typeDefs: this.typeDefs,
        resolvers: this.resolvers,
      }),
      graphiql: true,
    });
  }

  setTypeDefs(typeDefs: any) {
    this.typeDefs = typeDefs;
  }

  async on(method: string, name: string, resolver: any): Promise<void> {
    const type = method[0].toUpperCase() + method.slice(1);

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
    this.mountYoga();
    return await this.yoga.fetch(request, env, ctx);
  }

  async listen(port: number): Promise<void> {
    if (!this.server) {
      throw new Error("Server not defined");
    }
    this.mountYoga();
    this.server.on("request", this.yoga);
    this.server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }
}
