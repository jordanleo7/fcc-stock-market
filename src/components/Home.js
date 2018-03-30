import React, { Component } from 'react';
import StockList from './StockList';

class Home extends Component {

  constructor(props) {
    super(props);
      this.state = {
        //timestamp: props.timestamp
    }
  }

  render() {
    return (
      <div>
        <StockList />
        <footer>
          <div>
            <p>
              Data provided for free by <a href="https://iextrading.com/developer">IEX</a>.
            </p>
            <p>
              IEX Terms of Service: <a href="https://iextrading.com/api-exhibit-a">IEX Exhibit A</a>
            </p>
          </div>
        </footer>
      </div>
    )
  }
}

export default Home;
