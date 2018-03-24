import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import { deleteStockMutation, getStocksQuery } from '../queries/queries';

class DeleteStock extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.deleteStockMutation({
      variables: {
        ticker: this.props.stockTicker
      },
      refetchQueries: [{ query: getStocksQuery }]
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <button type="submit">Delete</button>
        </form>
      </div>
    )
  }
}

export default compose(
  graphql(getStocksQuery, { name: "getStocksQuery" }),
  graphql(deleteStockMutation, { name: "deleteStockMutation" })
)(DeleteStock);