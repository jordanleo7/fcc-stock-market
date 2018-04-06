import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getStocksQuery } from '../queries/queries';
import Stock from './Stock';
import AddStock from './AddStock';
import Chart from './Chart';
import io from "socket.io-client";

class StockList extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.socket = io(process.env.DOMAIN_NAME)
    this.socket.on('receive_stock', data => {
      this.props.data.refetch()
    })
  }

  stockList() {
    let data = this.props.data;
    if (data.loading) {
      return ( <div>Loading stocks</div> );
    } 
    if (data.error) {
      return <div>{data.error.message}</div>;
    }
    return data.stocks.map((stock, index) => {
      return (
        <Stock stock={stock} key={index} />
      );
    })
  }

  tickerChart() {
    let data = this.props.data;
    if (data.loading) {
      return 'loading';
    } 
    if (data.error) {
      return 'error';
    }
    let tickerListResults = data.stocks.map((stock, index) => {
      return stock.ticker;
    })
    return (<Chart tickers={ tickerListResults } />)
  }

  render() {
    return (
      <div>
        <div>
          { this.tickerChart() }
        </div>
        <ul className="stocklist">
          { this.stockList() }
          <li key="add"><AddStock /></li>
        </ul>
      </div>
    )
  }

}

export default graphql(getStocksQuery)(StockList);