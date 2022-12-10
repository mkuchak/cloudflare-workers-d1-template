import { IRepositoryFactory } from "@/domain/factory/IRepositoryFactory";
import { IUserRepository } from "@/domain/repository/IUserRepository";
import { IGetUsersOutputDTO } from "./IGetUsersDTO";

export class GetUsersUseCase {
  userRepository: IUserRepository;

  constructor(private readonly repositoryFactory: IRepositoryFactory) {
    this.userRepository = this.repositoryFactory.createUserRepository();
  }

  async execute(): Promise<IGetUsersOutputDTO> {
    const users = await this.userRepository.findAll();

    return users;
  }
}
