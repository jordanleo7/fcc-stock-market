import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { deleteStockMutation, getStocksQuery } from '../queries/queries';
import io from "socket.io-client";

class DeleteStock extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.socket = io(process.env.DOMAIN_NAME)
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.deleteStockMutation({
      variables: {
        ticker: this.props.stockTicker
      }//, refetchQueries: [{ query: getStocksQuery }]
    })
    this.socket.emit('delete_stock', {
      ticker: 'stock deleted'
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <button type="submit" className="button--delete-stock">X</button>
        </form>
      </div>
    )
  }
}

export default compose(
  graphql(getStocksQuery, { name: "getStocksQuery" }),
  graphql(deleteStockMutation, { name: "deleteStockMutation" })
)(DeleteStock);