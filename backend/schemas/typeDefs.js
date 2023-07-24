const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Tasks {
    _id: ID
    name: String
    taskCount: Int
    tasks: [Task]
  }

  type Task {
    _id: ID!
    title: String!
    description: String
    dueDate: String
    completed: Boolean!
  }

  type Profile {
    _id: ID
    name: String
    email: String
    tasks: [Task]
  }
  

  type Auth {
    token: String
    profile: Profile
  }

  type Query {
    tasks: [Tasks]
    task(_id: ID!): Task
    profiles: [Profile]
  }

  type Mutation {
    createTask(title: String!, description: String, dueDate: String, completed: Boolean!): Task
    updateTask(_id: ID!, title: String, description: String, dueDate: String, completed: Boolean): Task
    deleteTask(_id: ID!): Task
    addProfile(name: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
