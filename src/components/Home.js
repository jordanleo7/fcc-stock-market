import React, { Component } from 'react';
import StockList from './StockList';
import Footer from './Footer';
import Chat from './Chat';

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
        <Chat />
        <Footer />
      </div>
    )
  }
}

export default Home;
