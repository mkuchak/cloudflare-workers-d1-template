import { IRepositoryFactory } from "@/domain/factory/IRepositoryFactory";
import { UserRepositoryPrisma } from "@/infra/repository/prisma/implementation/UserRepositoryPrisma";
import type { PrismaClient } from "@prisma/client";

export class RepositoryFactoryPrisma implements IRepositoryFactory {
  constructor(private db: PrismaClient) {}

  createUserRepository(): UserRepositoryPrisma {
    return new UserRepositoryPrisma(this.db);
  }
}
