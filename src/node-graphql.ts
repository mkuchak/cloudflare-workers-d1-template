import { RepositoryFactoryPrisma } from "@/infra/factory/RepositoryFactoryPrisma";
import { GraphQLRouter } from "@/infra/graphql/GraphQLRouter";
import { PrismaClient } from "@prisma/client";
import { YogaAdapter } from "@/infra/graphql/YogaAdapter";
import { createServer } from "node:http";

const db = new PrismaClient();
const graphql = new YogaAdapter(createServer());
const repositoryFactory = new RepositoryFactoryPrisma(db);

const graphqlRouter = new GraphQLRouter(graphql, repositoryFactory);
graphqlRouter.init();

graphql.listen(3000);
