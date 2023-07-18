const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Tasks {
    _id: ID
    name: String
    taskCount: Int
    # Add a queryable field to retrieve an array of Tasks objects
    tasks: [Tasks]
  }

  type Task {
    _id: ID
    name: String
    content: String
    letterCount: Int
    # Add a queryable field to retrieve a single Profile object
    profile: Profile
  }

  # Define what can be queried for each profile
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
    tasks: [Tasks]
    task: [Task]
    profiles: [Profile]
  }
`;

module.exports = typeDefs;