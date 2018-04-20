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
      this.setState({ iexdata: response.data });
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {
    return (
      <li>
        <div>
          <span className="stock--ticker">{this.props.stock.ticker}</span>
          <DeleteStock stockTicker={this.props.stock.ticker} />
        </div>
        <div className="stock--data-container">
          <p>{this.state.iexdata.companyName}</p>
          <p>Latest price: {this.state.iexdata.latestPrice}</p>
          <p>Change: {this.state.iexdata.change}%</p>
          <p>52 Week High: {this.state.iexdata.week52High}</p>
          <p>52 Week Low: {this.state.iexdata.week52Low}</p>
          <p>Average Volume: {this.state.iexdata.avgTotalVolume}</p>
        </div>
      </li>
    )
  }
}

export default Stock;
