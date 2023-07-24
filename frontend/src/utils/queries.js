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

export const QUERY_PRODUCTS = gql`
  query getProducts {
    products {
      _id
      title
      content
      price
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


export const QUERY_USER_TASKS = gql`
  {
    profile {
      name
      tasks {
        _id
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($profileId: ID!) {
    checkout(profileId: $profileId) {
      cart {
        _id
        task {
          _id
          title
          content
          price
          quantity
        }
      }
      totalAmount
      paymentMethod
      address {
        street
        city
        state
        zip
      }
    }
  }
`;
