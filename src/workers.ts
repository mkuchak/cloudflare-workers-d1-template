import { RepositoryFactoryD1 } from "@/infra/factory/RepositoryFactoryD1";
import { HonoAdapter } from "@/infra/http/rest/HonoAdapter";
import { RestRouter } from "@/infra/http/rest/RestRouter";

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const http = new HonoAdapter();
    const repositoryFactory = new RepositoryFactoryD1(env.DB);

    const httpRouter = new RestRouter(http, repositoryFactory);
    httpRouter.init();

    return http.start(request, env, ctx);
  },
};
