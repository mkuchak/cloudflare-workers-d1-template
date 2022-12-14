import { RepositoryFactoryD1 } from "@/infra/factory/RepositoryFactoryD1";
import { HonoHttp } from "@/infra/http/HonoHttp";
import { Router } from "@/infra/http/Router";

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const http = new HonoHttp();
    const repositoryFactory = new RepositoryFactoryD1(env.DB);

    const router = new Router(http, repositoryFactory);
    router.init();

    return http.start(request, env, ctx);
  },
};
