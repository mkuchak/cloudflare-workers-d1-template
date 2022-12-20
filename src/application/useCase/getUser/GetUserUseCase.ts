import { IRepositoryFactory } from "@/domain/factory/IRepositoryFactory";
import { IUserRepository } from "@/domain/repository/IUserRepository";
import { AppError } from "@/utils/AppError";
import { StatusCodes } from "http-status-codes";
import { IGetUserInputDTO } from "@/application/useCase/getUser/IGetUserInputDTO";
import { IGetUserOutputDTO } from "@/application/useCase/getUser/IGetUserOutputDTO";

export class GetUserUseCase {
  userRepository: IUserRepository;

  constructor(private readonly repositoryFactory: IRepositoryFactory) {
    this.userRepository = this.repositoryFactory.createUserRepository();
  }

  async execute(input: IGetUserInputDTO): Promise<IGetUserOutputDTO> {
    const { id } = input;

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError("User not found", StatusCodes.NOT_FOUND);
    }

    return user;
  }
}
