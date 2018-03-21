import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

function TodoApp({ data: { todos } }) {
  return (
    <ul>
      {todos.map(({ id, text }) => (
        <li key={id}>{text}</li>
      ))}
    </ul>
  );
}

export default graphql(gql`
  query TodoAppQuery {
    todos {
      id
      text
    }
  }
`)(TodoApp);