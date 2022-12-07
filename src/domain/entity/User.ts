import { nanoid } from "nanoid";

export type UserProps = ClassProps<User>;

export class User {
  id?: string = nanoid();
  email: string;
  password: string;
  name?: string;
  picture?: string;
  isEmailVerified?: boolean = false;
  isActive?: boolean = true;
  createdAt?: Date = new Date();
  updatedAt?: Date = new Date();

  constructor(props: UserProps) {
    Object.assign(this, props);

    // TODO: validate email and encrypt password through value objects
  }
}
