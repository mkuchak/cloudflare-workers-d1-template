import { User, UserProps } from "@/domain/entity/User";
import { IUserRepository } from "@/domain/repository/IUserRepository";

export class UserRepositoryD1 implements IUserRepository {
  constructor(private readonly db: D1Database) {}

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

    const userExists = await this.db
      .prepare(`select * from User where id = ?`)
      .bind(id)
      .first();

    if (userExists) {
      await this.db
        .prepare(
          `update User set email = ?, password = ?, name = ?, picture = ?, isEmailVerified = ?, isActive = ?, updatedAt = ? where id = ?`
        )
        .bind(
          email,
          password,
          name,
          picture,
          Number(isEmailVerified),
          Number(isActive),
          updatedAt.toISOString(),
          id
        )
        .run();

      return;
    }

    await this.db
      .prepare(
        `insert into User (id, email, password, name, picture, isEmailVerified, isActive, createdAt, updatedAt) values (?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
      .bind(
        id,
        email,
        password,
        name,
        picture,
        Number(isEmailVerified),
        Number(isActive),
        createdAt.toISOString(),
        updatedAt.toISOString()
      )
      .run();
  }

  async findById(id: string): Promise<User> {
    const user: UserProps = await this.db
      .prepare(`select * from User where id = ?`)
      .bind(id)
      .first();

    if (!user) {
      return null;
    }

    return new User(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user: UserProps = await this.db
      .prepare(`select * from User where email = ?`)
      .bind(email)
      .first();

    if (!user) {
      return null;
    }

    return new User({
      ...user,
      isEmailVerified: Boolean(user.isEmailVerified),
      isActive: Boolean(user.isActive),
    });
  }

  async findAll(): Promise<User[]> {
    const { results: users }: { results?: UserProps[] } = await this.db
      .prepare(`select * from User`)
      .all();

    return users.map(
      (user) =>
        new User({
          ...user,
          isEmailVerified: Boolean(user.isEmailVerified),
          isActive: Boolean(user.isActive),
        })
    );
  }
}
