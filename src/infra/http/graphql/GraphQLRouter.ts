import { IRepositoryFactory } from "@/domain/factory/IRepositoryFactory";
import { IGraphQL } from "@/infra/http/graphql/IGraphQL";
import { graphqlExample } from "@/infra/http/graphql/middleware/graphqlExample";
import { UserResolver } from "@/infra/http/graphql/resolver/UserResolver";
import { typeDefs } from "@/infra/http/graphql/schema";

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

    this.graphql.on(
      "query",
      "getUser",
      graphqlExample("first middleware"),
      graphqlExample("second middleware"),
      (args: any, context: any) => this.userResolver.getUser(args, context)
    );

    this.graphql.on("mutation", "createUser", (args: any, context: any) =>
      this.userResolver.createUser(args, context)
    );

    this.graphql.setTypeDefs(typeDefs);
  }
}
