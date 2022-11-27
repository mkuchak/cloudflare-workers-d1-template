import { User } from "@/domain/entity/User";
import { RepositoryFactory } from "@/domain/factory/RepositoryFactory";
import { UserRepository } from "@/domain/repository/UserRepository";
import { HttpError } from "@/utils/HttpError";
import { CreateUserInputDTO, CreateUserOutputDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
  userRepository: UserRepository;

  constructor(private readonly repositoryFactory: RepositoryFactory) {
    this.userRepository = this.repositoryFactory.createUserRepository();
  }

  async execute(input: CreateUserInputDTO): Promise<CreateUserOutputDTO> {
    const { email, password, name, picture } = input;

    const isEmailAlreadyRegistered = await this.userRepository.findByEmail(
      email
    );

    if (isEmailAlreadyRegistered) {
      throw new HttpError("User already exists", 409);
    }

    const user = new User({ email, password, name, picture });

    await this.userRepository.save(user);

    return { id: user.id, email };
  }
}
