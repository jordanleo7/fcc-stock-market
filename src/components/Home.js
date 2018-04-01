import React, { Component } from 'react';
import StockList from './StockList';
import Footer from './Footer';

class Home extends Component {

  constructor(props) {
    super(props);
      this.state = {
        
    }
  }

  render() {
    return (
      <div>
        <StockList />
        <Footer />
      </div>
    )
  }
}

export default Home;
