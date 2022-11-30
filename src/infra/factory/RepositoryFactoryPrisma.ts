import { RepositoryFactory } from "@/domain/factory/RepositoryFactory";
import { PrismaClient } from "@prisma/client";
import { UserRepositoryPrisma } from "../repository/prisma/implementation/UserRepositoryPrisma";

export class RepositoryFactoryPrisma implements RepositoryFactory {
  constructor(private db: PrismaClient) {}

  createUserRepository(): UserRepositoryPrisma {
    return new UserRepositoryPrisma(this.db);
  }
}
