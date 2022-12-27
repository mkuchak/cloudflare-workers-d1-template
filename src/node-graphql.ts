import { RepositoryFactoryPrisma } from "@/infra/factory/RepositoryFactoryPrisma";
import { GraphQLRouter } from "@/infra/http/graphql/GraphQLRouter";
import { YogaAdapter } from "@/infra/http/graphql/YogaAdapter";
import { PrismaClient } from "@prisma/client";
import { createServer } from "node:http";

const db = new PrismaClient();
const server = createServer();

const http = new YogaAdapter(server);
const repositoryFactory = new RepositoryFactoryPrisma(db);

const httpRouter = new GraphQLRouter(http, repositoryFactory);
httpRouter.init();

http.listen(3000);
