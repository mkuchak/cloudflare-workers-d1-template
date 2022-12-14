import { IUserRepository } from "@/domain/repository/IUserRepository";

export interface IRepositoryFactory {
  createUserRepository(): IUserRepository;
}
