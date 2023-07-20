const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');
const cors = require('cors');



// Replace your MongoDB connection URI here
const MONGODB_URI = 'mongodb://localhost:27017/daily-task-conqueror';

// Define your GraphQL schema and resolvers here
const { typeDefs, resolvers } = require('./schemas');

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

const app = express();
app.use(cors());

// Define a custom route for the root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to Daily Task Conqueror!');
});

// ...


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