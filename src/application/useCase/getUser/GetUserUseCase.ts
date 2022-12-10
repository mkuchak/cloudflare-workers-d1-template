import { IRepositoryFactory } from "@/domain/factory/IRepositoryFactory";
import { IUserRepository } from "@/domain/repository/IUserRepository";
import { HttpError } from "@/utils/HttpError";
import { IGetUserInputDTO, IGetUserOutputDTO } from "./IGetUserDTO";

export class GetUserUseCase {
  userRepository: IUserRepository;

  constructor(private readonly repositoryFactory: IRepositoryFactory) {
    this.userRepository = this.repositoryFactory.createUserRepository();
  }

  async execute(input: IGetUserInputDTO): Promise<IGetUserOutputDTO> {
    const { id } = input;

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new HttpError("User not found", 404);
    }

    return user;
  }
}
