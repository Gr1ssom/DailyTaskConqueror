const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Tasks {
    _id: ID
    name: String
    taskCount: Int
    tasks: [Tasks]
  }

  type Task {
    _id: ID
    name: String
    content: String
    letterCount: Int
    profile: Profile
  }

  type Profile {
    _id: ID
    name: String
    tasks: String
  }

  type Auth {
    token: String
    profile: Profile
  }

  type Query {
    tasks: [Tasks]
    task: [Task]
    profiles: [Profile]
  }

  type Mutation {
    createTask(name: String!, content: String!): Task
    updateTask(_id: ID!, name: String, content: String): Task
    deleteTask(_id: ID!): Task
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
