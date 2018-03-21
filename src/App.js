import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Home from './components/Home';
import AddStock from './components/AddStock';
import logo from './logo.svg';
import './App.css';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:3001/graphql' }),
  cache: new InMemoryCache()
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
