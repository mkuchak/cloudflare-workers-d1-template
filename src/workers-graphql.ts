import { RepositoryFactoryD1 } from "@/infra/factory/RepositoryFactoryD1";
import { GraphQLRouter } from "@/infra/http/graphql/GraphQLRouter";
import { YogaAdapter } from "@/infra/http/graphql/YogaAdapter";

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const http = new YogaAdapter();
    const repositoryFactory = new RepositoryFactoryD1(env.DB);

    const httpRouter = new GraphQLRouter(http, repositoryFactory);
    httpRouter.init();

    return http.start(request, env, ctx);
  },
};
