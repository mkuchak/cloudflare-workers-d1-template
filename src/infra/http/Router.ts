import { RepositoryFactory } from "@/domain/factory/RepositoryFactory";
import { UserController } from "../controller/UserController";
import { Http } from "./Http";

export class Router {
  userController: UserController;

  constructor(
    readonly http: Http,
    readonly repositoryFactory: RepositoryFactory
  ) {
    this.userController = new UserController(repositoryFactory);
  }

  init() {
    this.http.on("get", "/api/v1/users", async () => ({
      status: 200,
      payload: await this.userController.getUsers(),
    }));

    this.http.on("get", "/api/v1/users/:id", async (request: Request) => ({
      status: 200,
      payload: await this.userController.getUser(request),
    }));

    this.http.on("post", "/api/v1/users", async (request: Request) => ({
      status: 200,
      payload: await this.userController.createUser(request),
    }));
  }
}
