import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Home from './components/Home';
import AddStock from './components/AddStock';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, ApolloProvider, createBatchingNetworkInterface } from 'react-apollo';
// import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

const networkInterface = createBatchingNetworkInterface({
  uri: 'http://0.0.0.0:3001/gql/',
  batchInterval: 0,
  opts: {
    credentials: 'same-origin',
  },
})

const client = new ApolloClient({
  networkInterface: networkInterface,
})

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div>
            <Route exact path='/' component={Home} />
            <Switch>
              <Route exact path='/addstock/' component={AddStock} />
            </Switch>
          </div>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
