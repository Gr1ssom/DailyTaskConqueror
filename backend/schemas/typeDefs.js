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

  type Query {
    tasks: [Tasks]
    task: [Task]
    profiles: [Profile]
  }

  type Mutation {
    createTask(name: String!, content: String!): Task
    updateTask(_id: ID!, name: String, content: String): Task
    deleteTask(_id: ID!): Task
  }
`;

module.exports = typeDefs;
