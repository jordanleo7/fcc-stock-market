import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import AddStock from './AddStock';
import StockList from './StockList';

class Home extends Component {
  render() {
    let { data } = this.props
    if (data.loading) {
      return <div>Loading</div>
    }
    return (
      <div>
        <StockList />
        <AddStock />
      </div>
    )
  }
}

export default Home;
