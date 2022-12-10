import { User } from "@/domain/entity/User";
import { IUserRepository } from "@/domain/repository/IUserRepository";
import { PrismaClient } from "@prisma/client";

export class UserRepositoryPrisma implements IUserRepository {
  constructor(private readonly db: PrismaClient) {}

  async save(user: User): Promise<void> {
    const {
      id,
      email,
      password,
      name,
      picture,
      isEmailVerified,
      isActive,
      createdAt,
      updatedAt,
    } = user;

    await this.db.user.upsert({
      where: { id },
      update: {
        email,
        password,
        name,
        picture,
        isEmailVerified,
        isActive,
        updatedAt,
      },
      create: {
        id,
        email,
        password,
        name,
        picture,
        isEmailVerified,
        isActive,
        createdAt,
        updatedAt,
      },
    });
  }

  async findById(id: string): Promise<User> {
    const user = await this.db.user.findUnique({ where: { id } });

    if (!user) {
      return null;
    }

    return new User(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.db.user.findUnique({ where: { email } });

    if (!user) {
      return null;
    }

    return new User(user);
  }

  async findAll(): Promise<User[]> {
    const users = await this.db.user.findMany();

    return users.map((user) => new User(user));
  }
}
