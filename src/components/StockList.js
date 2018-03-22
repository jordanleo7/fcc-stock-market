import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { StockQuery } from '../queries/queries';

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
    } else {
      return data.stocks.map(stock => {
        return (
          <li key={stock.id} onClick={ (e) => this.setState({ selected: stock.id }) }> {stock.name} </li>
        );
      })
    }
  }

  render() {
    return (
      <div>
        <ul id="stock-list">
          { this.displayStocks() }
        </ul>
      </div>
    )
  }

}

export default graphql(StockQuery)(StockList);