import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { getStocksQuery } from '../queries/queries';
import Stock from './Stock';

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
        <Stock stock={stock} />
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