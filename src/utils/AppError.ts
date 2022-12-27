import { GraphQLError } from "graphql";

export class AppError extends GraphQLError {
  readonly status: number;
  readonly error: string;

  constructor(message = "Internal Server Error", status = 500) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.error = message;
    this.status = status;
  }
}
