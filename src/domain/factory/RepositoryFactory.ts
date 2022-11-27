import { UserRepository } from "../repository/UserRepository";

export interface RepositoryFactory {
  createUserRepository(): UserRepository;
}
