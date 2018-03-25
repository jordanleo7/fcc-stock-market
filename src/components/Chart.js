import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { graphql } from 'react-apollo';
import { getStocksQuery } from '../queries/queries';
import Stock from './Stock';

class Chart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tickerList: props.tickerList,
      tickerData: [],
      chartData: []
    }
  }





/*
  componentDidMount() {
    let data = this.props.data;
    if (data.loading) {
      return ( <div>Loading stocks</div> );
    } 
    if (data.error) {
      return <div>{data.error.message}</div>;
    }
    return data.stocks.map((stock, index) => {
      this.setState(prevState => ({tickerList: [...prevState.tickerList, stock.ticker]}));
      this.getStockData(stock.ticker);

      return (
        'a'
      );
    })
  }

  tickerList() {
    let data = this.props.data;
    if (data.loading) {
      return 'loading';
    } 
    if (data.error) {
      return 'error';
    }
    return data.stocks.map((stock, index) => {
      return stock.ticker;
    })
  }
tickerList={ this.tickerList() }

  getStockData(ticker) {
    axios.get(`https://api.iextrading.com/1.0/stock/${ticker}/chart/1y`)
    .then((response) => {
      console.log('hi',this.state.tickerList);
      this.setState({ tickerData: response.data });
      console.log(this.state.tickerData);
      let prepareChartData = this.state.tickerData.map((x, index) => {
        //let prepareData = x.map((y, index) => {
          return x.close;
        //})
      });
      this.setState({ chartData: prepareChartData });
    })
    .catch((error) => {
      console.log(error);
    })
  }
  
      console.log('testing',this.state.tickerList);
      */

  render() {

    let chartData = {
      labels: [],
      datasets: [{
        label: 'TEST',
        data: ['150','151','153','155','149'],
        borderColor: ["red"],
        borderWidth: 2,
        fill: false
      }]
    };

    return (
      <div className="chart">
        <Line
          data={chartData}
          width={320}
          height={320}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            title: {
              display: true,
              text: "Stocks with Friends",
              fontSize: 25,
              fontColor: 'black',
              fontFamily: "'Arial', sans-serif"
            },
            legend: {
              display: true,
              position: "top",
              labels: {
                fontFamily: "'Arial', sans-serif"
              }
            }
          }}
        />
      </div>
    )
  }
}

export default graphql(getStocksQuery)(Chart);
