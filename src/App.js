import React, { Component } from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import { ApolloProvider, graphql } from 'react-apollo';
import Home from './components/Home';
import AddStock from './components/AddStock';
import logo from './logo.svg';
import './App.css';

const client = new ApolloClient({
  link: new HttpLink({ uri: process.env.HTTPLINK }),
  cache: new InMemoryCache()
});

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path='/' component={Home}  />
            </Switch>
          </div>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
