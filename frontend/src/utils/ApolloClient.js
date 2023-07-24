import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

// Create an HTTP link to connect to your GraphQL server
const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql', // Pointing to the backend server's GraphQL endpoint
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;
