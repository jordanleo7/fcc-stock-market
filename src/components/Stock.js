import React, { Component } from 'react';
import axios from 'axios';
import DeleteStock from './DeleteStock';

class Stock extends Component {

  constructor(props) {
    super(props);
    this.state = {
      iexdata: []
    }
  }

  componentDidMount() {
    axios.get(`https://api.iextrading.com/1.0/stock/${this.props.stock.ticker}/quote`)
    .then((response) => {
      this.setState({ iexdata: response });
      console.log(this.state.iexdata);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {
    return (
      <li> 
        {this.props.stock.ticker}
        {this.state.iexdata.latestPrice}
        <DeleteStock stockTicker={this.props.stock.ticker} />
      </li>
    )
  }
}

export default Stock;
