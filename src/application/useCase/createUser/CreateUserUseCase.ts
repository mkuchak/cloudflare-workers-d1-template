import { User } from "@/domain/entity/User";
import { IRepositoryFactory } from "@/domain/factory/IRepositoryFactory";
import { IUserRepository } from "@/domain/repository/IUserRepository";
import { AppError } from "@/utils/AppError";
import { StatusCodes } from "http-status-codes";
import { ICreateUserInputDTO } from "@/application/useCase/createUser/ICreateUserInputDTO";
import { ICreateUserOutputDTO } from "@/application/useCase/createUser/ICreateUserOutputDTO";

export class CreateUserUseCase {
  userRepository: IUserRepository;

  constructor(private readonly repositoryFactory: IRepositoryFactory) {
    this.userRepository = this.repositoryFactory.createUserRepository();
  }

  async execute(input: ICreateUserInputDTO): Promise<ICreateUserOutputDTO> {
    const { email, password, name, picture } = input;

    const isEmailAlreadyRegistered = await this.userRepository.findByEmail(
      email
    );

    if (isEmailAlreadyRegistered) {
      throw new AppError("User already exists", StatusCodes.CONFLICT);
    }

    const user = new User({ email, password, name, picture });

    await this.userRepository.save(user);

    return { id: user.id, email };
  }
}
