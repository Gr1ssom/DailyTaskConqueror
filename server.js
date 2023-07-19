const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');
const cors = require('cors');

// Replace your MongoDB connection URI here
const MONGODB_URI = 'mongodb://localhost:27017/daily-task-conqueror';

// Define your GraphQL schema and resolvers here
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

// Your Mongoose schema and model for the Task entity (replace the placeholders)
const { Task } = require('./backend/models/Task');
// const { yourOtherModel } = require('./models/yourOtherModel');

// Your Mongoose connection settings (replace if needed)
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const resolvers = {
  Query: {
    tasks: async () => {
      try {
        const tasks = await Task.find();
        return tasks;
      } catch (err) {
        console.error('Error fetching tasks:', err);
        return [];
      }
    },
    task: async (_, { id }) => {
      try {
        const task = await Task.findById(id);
        return task;
      } catch (err) {
        console.error('Error fetching task by ID:', err);
        return null;
      }
    },
  },
  Mutation: {
    createTask: async (_, { title, description, dueDate, completed }) => {
      try {
        const task = await Task.create({ title, description, dueDate, completed });
        return task;
      } catch (err) {
        console.error('Error creating task:', err);
        return null;
      }
    },
    updateTask: async (_, { id, title, description, dueDate, completed }) => {
      try {
        const updatedTask = await Task.findByIdAndUpdate(
          id,
          { title, description, dueDate, completed },
          { new: true }
        );
        return updatedTask;
      } catch (err) {
        console.error('Error updating task:', err);
        return null;
      }
    },
    deleteTask: async (_, { id }) => {
      try {
        const deletedTask = await Task.findByIdAndDelete(id);
        return deletedTask;
      } catch (err) {
        console.error('Error deleting task:', err);
        return null;
      }
    },
  },
};

async function startServer() {
  const app = express();
  app.use(cors());

  const server = new ApolloServer({ typeDefs, resolvers });

  await server.start(); // Wait for the Apollo Server to start

  server.applyMiddleware({ app });

  const port = process.env.PORT || 4000;

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}${server.graphqlPath}`);
  });
}

startServer();