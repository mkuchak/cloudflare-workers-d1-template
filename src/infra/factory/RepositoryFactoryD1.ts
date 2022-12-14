import { IRepositoryFactory } from "@/domain/factory/IRepositoryFactory";
import { UserRepositoryD1 } from "@/infra/repository/d1/implementation/UserRepositoryD1";

export class RepositoryFactoryD1 implements IRepositoryFactory {
  constructor(private db: D1Database) {}

  createUserRepository(): UserRepositoryD1 {
    return new UserRepositoryD1(this.db);
  }
}
