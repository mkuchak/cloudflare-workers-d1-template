import { User } from "@/domain/entity/User";
import { UserRepository } from "@/domain/repository/UserRepository";
import { PrismaClient } from "@prisma/client";

export class UserRepositoryPrisma implements UserRepository {
  constructor(private readonly db: PrismaClient) {}

  async save(user: User): Promise<void> {
    await this.db.user.upsert({
      where: { id: user.id },
      update: {
        email: user.email,
        password: user.password,
        name: user.name,
        picture: user.picture,
        isEmailVerified: user.isEmailVerified,
        isActive: user.isActive,
        updatedAt: user.updatedAt,
      },
      create: {
        id: user.id,
        email: user.email,
        password: user.password,
        name: user.name,
        picture: user.picture,
        isEmailVerified: user.isEmailVerified,
        isActive: user.isActive,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
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
