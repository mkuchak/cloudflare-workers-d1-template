import { IRepositoryFactory } from "@/domain/factory/IRepositoryFactory";
import { IRest } from "@/infra/http/rest/IRest";
import { UserController } from "@/infra/http/rest/controller/UserController";
import { restExample } from "@/infra/http/rest/middleware/restExample";

export class RestRouter {
  private userController: UserController;

  constructor(
    readonly http: IRest,
    readonly repositoryFactory: IRepositoryFactory
  ) {
    this.userController = new UserController(repositoryFactory);
  }

  init() {
    this.http.on("get", "/api/v1/users", () => this.userController.getUsers());

    this.http.on(
      "get",
      "/api/v1/users/:id",
      restExample("first middleware"),
      restExample("second middleware"),
      (request: Request) => this.userController.getUser(request)
    );

    this.http.on("post", "/api/v1/users", (request: Request) =>
      this.userController.createUser(request)
    );
  }
}
