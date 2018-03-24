import React, { Component } from 'react';
import AddStock from './AddStock';
import DeleteStock from './DeleteStock';

class Stock extends Component {
  render() {
    return (
      <div>
        <li key={this.props.index}> {this.props.stock.ticker} <DeleteStock stockTicker={this.props.stock.ticker} /></li>
      </div>
    )
  }
}

export default Stock;
