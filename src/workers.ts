import { RepositoryFactoryD1 } from "@/infra/factory/RepositoryFactoryD1";
import { HonoHttp } from "@/infra/http/HonoAdapter";
import { HttpRouter } from "@/infra/http/HttpRouter";

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const http = new HonoHttp();
    const repositoryFactory = new RepositoryFactoryD1(env.DB);

    const httpRouter = new HttpRouter(http, repositoryFactory);
    httpRouter.init();

    return http.start(request, env, ctx);
  },
};
