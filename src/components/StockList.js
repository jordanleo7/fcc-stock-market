import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getStocksQuery } from '../queries/queries';

class StockList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }

  displayStocks() {
    let data = this.props.data;
    if (data.error) {
      return <div>Error! {data.error.message}</div>;
    }
    if (data.loading) {
      return ( <div>Loading stocks</div> );
    } 
    return data.stocks.map(stock => {
      return (
        <li> {stock.ticker} </li>
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