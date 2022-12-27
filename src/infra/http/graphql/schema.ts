import gql from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: String!
    email: String!
    password: String!
    name: String
    picture: String
    isEmailVerified: Boolean!
    isActive: Boolean!
    createdAt: String!
    updatedAt: String!
  }
  input CreateUserInput {
    email: String!
    password: String!
    name: String
    picture: String
  }
  type CreateUserOutput {
    id: String!
    email: String!
  }
  type Query {
    getUsers: [User!]!
  }
  type Query {
    getUser(id: String!): User!
  }
  type Mutation {
    createUser(input: CreateUserInput!): CreateUserOutput!
  }
`;
