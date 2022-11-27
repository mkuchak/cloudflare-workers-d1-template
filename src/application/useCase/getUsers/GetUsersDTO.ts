export type GetUsersOutputDTO = {
  id?: string;
  email: string;
  password: string;
  name?: string;
  picture?: string;
  isEmailVerified?: boolean;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}[];
