import { RepositoryFactory } from "@/domain/factory/RepositoryFactory";
import { UserRepositoryD1 } from "../repository/d1/implementation/UserRepositoryD1";

export class RepositoryFactoryD1 implements RepositoryFactory {
  constructor(private db: D1Database) {}

  createUserRepository(): UserRepositoryD1 {
    return new UserRepositoryD1(this.db);
  }
}
