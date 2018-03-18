import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import logo from './logo.svg';
import './App.css';

// here we create a query opearation
const MY_QUERY = gql`query { todos { text } }`;

// We then can use the graphql container to pass the query results returned by MY_QUERY
// to a component as a prop (and update them as the results change)
const MyComponentWithData = graphql(MY_QUERY)(props => <div>...</div>);

class App extends Component {
  render() {
    return (
      <MyComponentWithData />
    );
  }
}

export default App;
