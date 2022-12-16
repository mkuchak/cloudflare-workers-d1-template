import { CreateUserUseCase } from "@/application/useCase/createUser/CreateUserUseCase";
import { GetUserUseCase } from "@/application/useCase/getUser/GetUserUseCase";
import { GetUsersUseCase } from "@/application/useCase/getUsers/GetUsersUseCase";
import { IRepositoryFactory } from "@/domain/factory/IRepositoryFactory";

export class UserResolver {
  constructor(private repositoryFactory: IRepositoryFactory) {}

  async getUsers() {
    const getUsersUseCase = new GetUsersUseCase(this.repositoryFactory);

    const output = await getUsersUseCase.execute();

    return output;
  }

  async getUser(args: any) {
    const input = { id: args.id };

    const getUserUseCase = new GetUserUseCase(this.repositoryFactory);

    const output = await getUserUseCase.execute(input);

    return output;
  }

  async createUser(args: any, context: any) {
    const input = {
      email: args.input.email,
      password: args.input.password,
      name: args.input.name,
      picture: args.input.picture,
      cf: context.request?.cf, // get user location info if running on Cloudflare
    };

    const createUserUseCase = new CreateUserUseCase(this.repositoryFactory);

    const output = await createUserUseCase.execute(input);

    return output;
  }
}
