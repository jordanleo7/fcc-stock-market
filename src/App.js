import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import gql from 'graphql-tag';
import { ApolloProvider, graphql } from 'react-apollo';
import Home from './components/Home';
import AddStock from './components/AddStock';
import logo from './logo.svg';
import './App.css';
import { subscribeToTimer } from './api';

const client = new ApolloClient({
  link: new HttpLink({ uri: process.env.HTTPLINK }),
  cache: new InMemoryCache()
});

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      timestamp: 'no timestamp yet'
    };
    subscribeToTimer((err, timestamp) => this.setState({ 
      timestamp
    }));
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <div>
            <Route exact path='/' component={Home} timestamp={this.state.timestamp} />
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
