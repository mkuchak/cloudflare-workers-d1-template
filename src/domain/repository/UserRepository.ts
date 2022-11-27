import { User } from "../entity/User";

export interface UserRepository {
  save(user: User): Promise<void>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findAll(): Promise<User[]>;
}
