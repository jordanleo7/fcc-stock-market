import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getStocksQuery } from '../queries/queries';
import DeleteStock from './DeleteStock';

class StockList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  displayStocks() {
    let data = this.props.data;
    console.log(data);
    if (data.loading) {
      return ( <div>Loading stocks</div> );
    } 
    if (data.error) {
      return <div>{data.error.message}</div>;
    }
    return data.stocks.map((stock, index) => {
      return (
        <li key={index}> {stock.ticker} <DeleteStock stockTicker={stock.ticker} /></li>
      );
    })
  }

  render() {
    return (
      <div>
        <ul>
          { this.displayStocks() }
        </ul>
      </div>
    )
  }

}

export default graphql(getStocksQuery)(StockList);