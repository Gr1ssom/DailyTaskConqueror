import { gql } from '@apollo/client';

export const QUERY_TASKS = gql`
  query getTasks($tasks: ID) {
    tasks(tasks: $tasks) {
      _id
      title
      content
      quantity
    }
  }
`;

export const QUERY_PROFILE = gql`
  query getProfile($profile: [ID]!) {
    profile(profiles: $profile) {
      session
    }
  }
`;

export const QUERY_ALL_TASKS = gql`
  {
    tasks {
      _id
      title
      content
      quantity
    }
  }
`;


export const QUERY_USER = gql`
  {
    profile {
      name
      tasks {
        _id
      }
    }
  }
`;