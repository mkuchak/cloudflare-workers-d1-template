import { RepositoryFactory } from "@/domain/factory/RepositoryFactory";
import { UserRepository } from "@/domain/repository/UserRepository";
import { HttpError } from "@/utils/HttpError";
import { GetUserInputDTO, GetUserOutputDTO } from "./GetUserDTO";

export class GetUserUseCase {
  userRepository: UserRepository;

  constructor(private readonly repositoryFactory: RepositoryFactory) {
    this.userRepository = this.repositoryFactory.createUserRepository();
  }

  async execute(input: GetUserInputDTO): Promise<GetUserOutputDTO> {
    const { id } = input;

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new HttpError("User not found", 404);
    }

    return user;
  }
}
