import { ApolloLink } from '@apollo/client';

const authenticationMiddleware = new ApolloLink((operation, forward) => {
    // Retrieve the token from local storage
    const token = localStorage.getItem('id_token');

    // Add the token to the headers
    operation.setContext(({ headers = {} }) => ({
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
        }
    }));

    return forward(operation);
});

export default authenticationMiddleware;
