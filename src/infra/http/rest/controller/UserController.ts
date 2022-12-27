import { StatusCodes } from "http-status-codes";
import { CreateUserUseCase } from "@/application/useCase/createUser/CreateUserUseCase";
import { GetUserUseCase } from "@/application/useCase/getUser/GetUserUseCase";
import { GetUsersUseCase } from "@/application/useCase/getUsers/GetUsersUseCase";
import { IRepositoryFactory } from "@/domain/factory/IRepositoryFactory";

export class UserController {
  constructor(private repositoryFactory: IRepositoryFactory) {}

  async getUsers(): Promise<Callback> {
    const getUsersUseCase = new GetUsersUseCase(this.repositoryFactory);

    const output = await getUsersUseCase.execute();

    return {
      status: StatusCodes.OK,
      json: output,
    };
  }

  async getUser(request: Request): Promise<Callback> {
    const input = { id: request.params.id };

    // @ts-ignore (example middleware)
    console.log("example:", request?.message);

    const getUserUseCase = new GetUserUseCase(this.repositoryFactory);

    const output = await getUserUseCase.execute(input);

    return {
      status: StatusCodes.OK,
      json: output,
    };
  }

  async createUser(request: Request): Promise<Callback> {
    const input = {
      email: request.content.email,
      password: request.content.password,
      name: request.content.name,
      picture: request.content.picture,
      cf: request?.cf, // get user location info if running on Cloudflare
    };

    const createUserUseCase = new CreateUserUseCase(this.repositoryFactory);

    const output = await createUserUseCase.execute(input);

    return {
      status: StatusCodes.CREATED,
      json: output,
    };
  }
}
