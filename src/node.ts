import "express-async-errors";

import { RepositoryFactoryPrisma } from "@/infra/factory/RepositoryFactoryPrisma";
import { PrismaClient } from "@prisma/client";
import { HttpRouter } from "@/infra/http/HttpRouter";
import { ExpressAdapter } from "@/infra/http/ExpressAdapter";

const db = new PrismaClient();
const http = new ExpressAdapter();
const repositoryFactory = new RepositoryFactoryPrisma(db);

const httpRouter = new HttpRouter(http, repositoryFactory);
httpRouter.init();

http.listen(3000);
