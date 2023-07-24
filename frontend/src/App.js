import React from 'react';
import { Provider } from 'react-redux'; // Import the Redux Provider
import store from './utils/store'; // adjust the path to your Redux store
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { authenticationMiddleware, errorMiddleware } from './middleware';

import Home from './pages/Home';
import Detail from './pages/Detail';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Nav from './components/Nav/index';
import LandingPage from './pages/LandingPage';

import './App.css';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
}).concat(authenticationMiddleware, errorMiddleware);

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}> {/* Wrap with Redux Provider */}
        <Router>
          <div>
            <Nav />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/tasks/:id" element={<Detail />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </div>
        </Router>
      </Provider>
    </ApolloProvider>
  );
}

export default App;
