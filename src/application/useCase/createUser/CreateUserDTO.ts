export interface CreateUserInputDTO {
  email: string;
  password: string;
  name?: string;
  picture?: string;
}

export interface CreateUserOutputDTO {
  id: string;
  email: string;
}
