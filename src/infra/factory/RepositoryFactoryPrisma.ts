import { IRepositoryFactory } from "@/domain/factory/IRepositoryFactory";
import { PrismaClient } from "@prisma/client";
import { UserRepositoryPrisma } from "../repository/prisma/implementation/UserRepositoryPrisma";

export class RepositoryFactoryPrisma implements IRepositoryFactory {
  constructor(private db: PrismaClient) {}

  createUserRepository(): UserRepositoryPrisma {
    return new UserRepositoryPrisma(this.db);
  }
}
