const express = require('express');
require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const cors = require('cors'); // Import the cors middleware
const { Profile } = require('./models/Profile'); // Import the Profile model

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Use the cors middleware to enable CORS
app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ Profile }) // Pass the Profile model to the resolvers
});

const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

startApolloServer();
