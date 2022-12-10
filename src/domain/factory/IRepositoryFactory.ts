import { IUserRepository } from "../repository/IUserRepository";

export interface IRepositoryFactory {
  createUserRepository(): IUserRepository;
}
