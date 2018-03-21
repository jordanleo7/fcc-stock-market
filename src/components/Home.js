import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import AddStock from './AddStock';

const query = gql`
  query AllStocksQuery {
    allStocks(orderBy: createdAt_DESC) {
      name
    }
  }
`


class Home extends Component {
  render() {
    let { data } = this.props
    if (data.loading) {
      return <div>Loading</div>
    }
    return (
      <div>Home


        <AddStock />
      </div>
    )
  }
}

Home = graphql(query)(Home)

export default Home;
