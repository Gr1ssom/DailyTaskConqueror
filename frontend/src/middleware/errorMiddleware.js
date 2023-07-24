import { onError } from '@apollo/client/link/error';

const errorMiddleware = onError(({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) => {
            // Send errors to a centralized logging system
            // logErrorToMyService(message, locations, path);

            // Handle specific GraphQL errors
            switch (message) {
                case 'UNAUTHENTICATED':
                    // Handle authentication error, e.g. redirect to login, refresh token, etc.
                    // redirectToLoginOrRefreshTokenLogic();
                    break;
                default:
                    // Display a generic error message to the user
                    console.error("An error occurred while processing your request.");
                    break;
            }
        });
    }

    if (networkError) {
        console.error(`[Network error]: ${networkError}`);
        // Handle other network errors, or redirect to a failure page, or show a notification
    }

    // Continue with the next link in the chain
    return forward(operation);
});

export default errorMiddleware;
