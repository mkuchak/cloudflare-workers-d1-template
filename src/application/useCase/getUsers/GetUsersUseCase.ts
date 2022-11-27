import { RepositoryFactory } from "@/domain/factory/RepositoryFactory";
import { UserRepository } from "@/domain/repository/UserRepository";
import { GetUsersOutputDTO } from "./GetUsersDTO";

export class GetUsersUseCase {
  userRepository: UserRepository;

  constructor(private readonly repositoryFactory: RepositoryFactory) {
    this.userRepository = this.repositoryFactory.createUserRepository();
  }

  async execute(): Promise<GetUsersOutputDTO> {
    const users = await this.userRepository.findAll();

    return users;
  }
}
