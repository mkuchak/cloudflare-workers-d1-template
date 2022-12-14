import "express-async-errors";

import { PrismaClient } from "@prisma/client";
import { RepositoryFactoryPrisma } from "@/infra/factory/RepositoryFactoryPrisma";
import { ExpressHttp } from "@/infra/http/ExpressHttp";
import { Router } from "@/infra/http/Router";

const db = new PrismaClient();
const http = new ExpressHttp();
const repositoryFactory = new RepositoryFactoryPrisma(db);

const router = new Router(http, repositoryFactory);
router.init();

http.listen(3000);
