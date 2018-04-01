import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { addStockMutation, getStocksQuery } from '../queries/queries';

class AddStock extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ticker: ''
    };
    this.handleTickerChange = this.handleTickerChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTickerChange(event) {
    this.setState({ticker: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addStockMutation({
      variables: {
        ticker: this.state.ticker.toUpperCase()
      },
      refetchQueries: [{ query: getStocksQuery }]
    })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="ticker" value={this.state.ticker} onChange={this.handleTickerChange} placeholder="ticker" required />
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