import { StatusCodes } from "http-status-codes";
import { faker } from "@faker-js/faker";
import axios, { AxiosInstance } from "axios";

let api: AxiosInstance;

beforeAll(async () => {
  const baseURL = `http://localhost:3000/api/v1`;

  api = axios.create({
    baseURL,
    validateStatus: () => true,
  });
});

function userFactory() {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
    name: faker.name.fullName(),
    picture: faker.image.imageUrl(),
  };
}

describe("/api/v1", () => {
  describe("POST /users", () => {
    it("should create a new user", async () => {
      const dto = userFactory();

      const { status, data } = await api.post("/users", dto);

      expect(status).toBe(StatusCodes.CREATED);
      expect(data).toEqual({
        id: expect.any(String),
        email: dto.email,
      });
    });

    it("should not create a new user if email is already registered", async () => {
      const dto = userFactory();

      await api.post("/users", dto);
      const { status, data } = await api.post("/users", dto);

      expect(status).toBe(StatusCodes.CONFLICT);
      expect(data).toEqual({
        error: "User already exists",
      });
    });
  });

  describe("GET /users", () => {
    it("should show a list of users", async () => {
      const { status } = await api.get("/users");

      expect(status).toBe(StatusCodes.OK);
    });
  });

  describe("GET /users/:id", () => {
    it("should show a user by id", async () => {
      const dto = userFactory();

      const { data: user } = await api.post("/users", dto);
      const { status, data } = await api.get(`/users/${user.id}`);

      expect(status).toBe(StatusCodes.OK);
      expect(data).toEqual(
        expect.objectContaining({
          id: user.id,
          email: dto.email,
          name: dto.name,
          picture: dto.picture,
        })
      );
    });

    it("should not show a user if user does not exist", async () => {
      const { status, data } = await api.get(
        `/users/${faker.random.alphaNumeric(21)}`
      );

      expect(status).toBe(StatusCodes.NOT_FOUND);
      expect(data).toEqual({
        error: "User not found",
      });
    });
  });
});
