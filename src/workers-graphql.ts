import { RepositoryFactoryD1 } from "@/infra/factory/RepositoryFactoryD1";
import { GraphQLRouter } from "@/infra/graphql/GraphQLRouter";
import { YogaAdapter } from "@/infra/graphql/YogaAdapter";

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const graphql = new YogaAdapter();
    const repositoryFactory = new RepositoryFactoryD1(env.DB);

    const graphqlRouter = new GraphQLRouter(graphql, repositoryFactory);
    graphqlRouter.init();

    return graphql.start(request, env, ctx);
  },
};
