import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Query } from "react-apollo";
import { getStocksQuery } from '../queries/queries';
import Stock from './Stock';
import AddStock from './AddStock';
import Chart from './Chart';
import io from "socket.io-client";

class StockList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tickers: null
    };
    this.socket = io(process.env.DOMAIN_NAME);
    this.socket.on('receive_stock', data => {
      this.props.data.fetchMore({
        updateQuery: (previousResult, { fetchMoreResult, queryVariables }) => {
          return {
            ...previousResult,
            // Add the new data to the end of the old data.
            stocks: [/*...previousResult.stocks,*/ ...fetchMoreResult.stocks],
          };
        },
      });
      //<Query query={getStocksQuery}>
      //{() => refetch()}
      //</Query>
      //mutate({
        //... insert comment mutation
        // <Query query={getStocksQuery}>{() => refetch()}</Query>
      // this.props.data.refetch() 
    //})
      //apolloclient.queryManager.refetchQueryByName(getStocksQuery); // refetchQueries: [{ query: getStocksQuery }]
    })
  }

  stockList() {
    const data = this.props.data;
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
    const data = this.props.data;
    if (data.loading) {
      return 'loading';
    } 
    if (data.error) {
      return 'error';
    }
    let tickerListResults = data.stocks.map((stock, index) => {
      return stock.ticker;
    })
    return (console.log('tickers:',tickerListResults), <Chart tickers={ tickerListResults } />)
  }

  render() {

    console.log('getStocksQuery:',this.props.data)
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