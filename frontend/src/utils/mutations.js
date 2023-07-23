import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
      }
    }
  }
`;

export const ADD_TASK = gql`
  mutation addTask($task: [ID]!) {
    addTask(tasks: $task) {
      tasks {
        _id
        name
        content
        quantity
      }
    }
  }
`;

export const ADD_PROFILE = gql`
  mutation addProfile(
    $name: String!
    $email: String!
    $password: String!
  ) {
    addProfile(
      name: $name
      email: $email
      password: $password
    ) {
      token
      profile {
        _id
      }
    }
  }
`;