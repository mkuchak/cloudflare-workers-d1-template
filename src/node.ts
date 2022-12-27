import "express-async-errors";

import { RepositoryFactoryPrisma } from "@/infra/factory/RepositoryFactoryPrisma";
import { ExpressAdapter } from "@/infra/http/rest/ExpressAdapter";
import { RestRouter } from "@/infra/http/rest/RestRouter";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const http = new ExpressAdapter();
const repositoryFactory = new RepositoryFactoryPrisma(db);

const httpRouter = new RestRouter(http, repositoryFactory);
httpRouter.init();

http.listen(3000);
