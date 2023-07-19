const { gql } = require('apollo-server-express');

// Define your GraphQL schema here
const typeDefs = gql`
  type Task {
    _id: ID!
    title: String!
    description: String
    dueDate: String
    completed: Boolean!
  }

  type Query {
    tasks: [Task]
    task(id: ID!): Task
  }

  type Mutation {
    createTask(title: String!, description: String, dueDate: String, completed: Boolean!): Task
    updateTask(id: ID!, title: String, description: String, dueDate: String, completed: Boolean): Task
    deleteTask(id: ID!): Task
  }
`;

module.exports = typeDefs;
