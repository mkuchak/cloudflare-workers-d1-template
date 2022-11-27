import { CreateUserUseCase } from "@/application/useCase/createUser/CreateUserUseCase";
import { GetUserUseCase } from "@/application/useCase/getUser/GetUserUseCase";
import { GetUsersUseCase } from "@/application/useCase/getUsers/GetUsersUseCase";
import { RepositoryFactory } from "@/domain/factory/RepositoryFactory";

export class UserController {
  constructor(private repositoryFactory: RepositoryFactory) {}

  async createUser(request: Request) {
    const input = {
      email: request.content.email,
      password: request.content.password,
      name: request.content.name,
      picture: request.content.picture,
    };

    const createUserUseCase = new CreateUserUseCase(this.repositoryFactory);

    const output = await createUserUseCase.execute(input);

    return output;
  }

  async getUser(request: Request) {
    const input = { id: request.params.id };

    const getUserUseCase = new GetUserUseCase(this.repositoryFactory);

    const output = await getUserUseCase.execute(input);

    return output;
  }

  async getUsers() {
    const getUsersUseCase = new GetUsersUseCase(this.repositoryFactory);

    const output = await getUsersUseCase.execute();

    return output;
  }
}
