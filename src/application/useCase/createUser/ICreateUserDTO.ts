export interface ICreateUserInputDTO {
  email: string;
  password: string;
  name?: string;
  picture?: string;
}

export interface ICreateUserOutputDTO {
  id: string;
  email: string;
}
