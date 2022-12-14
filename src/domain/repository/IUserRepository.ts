import { User } from "@/domain/entity/User";

export interface IUserRepository {
  save(user: User): Promise<void>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findAll(): Promise<User[]>;
}
