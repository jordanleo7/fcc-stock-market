import React, { Component } from 'react';
import AddStock from './AddStock';
import StockList from './StockList';

class Home extends Component {
  render() {
    return (
      <div>
        <StockList />
        <AddStock />
      </div>
    )
  }
}

export default Home;
