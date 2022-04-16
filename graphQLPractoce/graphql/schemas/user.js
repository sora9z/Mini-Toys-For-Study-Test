const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    id: Int!
    name: String!
    email: String!
    password: String!
    posts: [Post!]
  }

  extend type Mutation {
    register(input: RegisterInput!): RegisterResponse
    login(input: LoginInput!): LoginResponse
  }

  type RegisterResponse {
    id: Int!
    name: String!
    email: String!
  }

  input RegisterInput {
    name: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type LoginResponse {
    id: Int!
    name: String!
    email: String!
    token: String!
  }
`;

/*


- We created a type User, and made all the fields required using the bang !
- In the User type, we added a field posts which returns type Post, this makes  it possible for us to query the posts created by a user
[Post!] means that it's okay for a user not to have a post, but if she/he does have, it must be of type Post
- We defined two mutations, register, and login, these serve as the register and login endpoints respectively

*/
