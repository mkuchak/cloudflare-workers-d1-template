import { faker } from "@faker-js/faker";
import { UserProps, User } from "@/domain/entity/User";

let dto: UserProps;

beforeAll(() => {
  dto = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    name: faker.name.fullName(),
    picture: faker.image.avatar(),
  };
});

describe("User", () => {
  it("should create a new user", () => {
    const user = new User(dto);

    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("email", dto.email);
    expect(user).toHaveProperty("password", dto.password);
    expect(user).toHaveProperty("name", dto.name);
    expect(user).toHaveProperty("picture", dto.picture);
    expect(user).toHaveProperty("isEmailVerified", false);
    expect(user).toHaveProperty("isActive", true);
    expect(user).toHaveProperty("createdAt");
    expect(user).toHaveProperty("updatedAt");
  });

  it("should create a new user without name and picture", () => {
    const { name, picture, ...restDto } = dto;

    const user = new User(restDto);

    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("email", dto.email);
    expect(user).toHaveProperty("password", dto.password);
  });

  it("should create a new user with set id", () => {
    const id = faker.datatype.uuid();

    const user = new User({ ...dto, id });

    expect(user).toHaveProperty("id", id);
    expect(user).toHaveProperty("email", dto.email);
    expect(user).toHaveProperty("password", dto.password);
  });
});
