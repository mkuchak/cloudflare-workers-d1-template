import { nanoid } from "nanoid";

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

  constructor(props: User) {
    Object.assign(this, props);

    // TODO: encrypt password through a value object
  }
}
