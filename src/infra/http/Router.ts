import { IRepositoryFactory } from "@/domain/factory/IRepositoryFactory";
import { UserController } from "@/infra/controller/UserController";
import { IHttp } from "@/infra/http/IHttp";

export class Router {
  userController: UserController;

  constructor(
    readonly http: IHttp,
    readonly repositoryFactory: IRepositoryFactory
  ) {
    this.userController = new UserController(repositoryFactory);
  }

  init() {
    this.http.on("get", "/api/v1/users", () => this.userController.getUsers());

    this.http.on("get", "/api/v1/users/:id", (request: Request) =>
      this.userController.getUser(request)
    );

    this.http.on("post", "/api/v1/users", (request: Request) =>
      this.userController.createUser(request)
    );
  }
}
