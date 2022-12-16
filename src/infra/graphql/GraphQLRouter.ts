import { IRepositoryFactory } from "@/domain/factory/IRepositoryFactory";
import { IGraphQL } from "@/infra/graphql/IGraphQL";
import { UserResolver } from "@/infra/graphql/resolver/UserResolver";
import { typeDefs } from "@/infra/graphql/schema";

export class GraphQLRouter {
  private userResolver: UserResolver;

  constructor(
    readonly graphql: IGraphQL,
    readonly repositoryFactory: IRepositoryFactory
  ) {
    this.userResolver = new UserResolver(repositoryFactory);
  }

  init() {
    this.graphql.on("query", "getUsers", () => this.userResolver.getUsers());

    this.graphql.on("query", "getUser", (args: any) =>
      this.userResolver.getUser(args)
    );

    this.graphql.on("mutation", "createUser", (args: any, context: any) =>
      this.userResolver.createUser(args, context)
    );

    this.graphql.setTypeDefs(typeDefs);
  }
}
