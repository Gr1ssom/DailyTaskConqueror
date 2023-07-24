import { gql } from '@apollo/client';

export const ADD_TASK = gql`
  mutation addTask(
    $title: String!
    $description: String!
    $dueDate: String  # Add other task properties as needed
  ) {
    createTask(
      title: $title
      description: $description
      dueDate: $dueDate
      # Add other task properties here
    ) {
      _id
      title
      description
      dueDate
      completed  # Add other task properties you want to receive after creation
    }
  }
`;

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
