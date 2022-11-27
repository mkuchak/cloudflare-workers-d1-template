export interface GetUserInputDTO {
  id: string;
}

export interface GetUserOutputDTO {
  id?: string;
  email: string;
  password: string;
  name?: string;
  picture?: string;
  isEmailVerified?: boolean;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
