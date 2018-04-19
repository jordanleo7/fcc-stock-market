import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { addStockMutation, getStocksQuery } from '../queries/queries';
import io from "socket.io-client";
import axios from 'axios';

class AddStock extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ticker: '',
      iexdata: null
    };
    this.socket = io(process.env.DOMAIN_NAME)
    this.handleTickerChange = this.handleTickerChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTickerChange(event) {
    this.setState({ticker: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();

    // Check if stock input is valid
    axios.get(`https://api.iextrading.com/1.0/stock/${this.state.ticker}/quote`)
    .then((response) => {
      // If stock is valid, add it to database:
      if (response.data) {
        this.props.addStockMutation({
          variables: {
            ticker: this.state.ticker.toUpperCase()
          }//, refetchQueries: [{ query: getStocksQuery }]
        })
        this.socket.emit('add_stock', {
          ticker: this.state.ticker.toUpperCase()
        })
      } else {

      }


      //this.setState({ iexdata: response.data });
      //console.log('Stock.js stock data:',this.state.iexdata);
    })
    .catch((error) => {
      console.log(error);
    })




  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="ticker" value={this.state.ticker} onChange={this.handleTickerChange} placeholder="Stock ticker" required />
          <button type="submit" className="button--add-stock">Add</button>
        </form>
      </div>
    )
  }
}

export default compose(
  graphql(getStocksQuery, { name: "getStocksQuery" }),
  graphql(addStockMutation, { name: "addStockMutation" })
)(AddStock);