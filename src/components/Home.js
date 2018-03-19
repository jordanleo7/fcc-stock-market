import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { gql, graphql } from 'react-apollo';

const query = gql`{
  allStocks {
    name
  }
}`


class Home extends Component {
  render() {
    let { data } = this.props
    if (data.loading) {
      return <div>Loading</div>
    }
    return (
      <div>Home</div>
    )
  }
}

Home = graphql(query)(Home)
export default Home;