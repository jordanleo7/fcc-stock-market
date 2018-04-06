import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
//import io from "socket.io-client";

class Chart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      iexResultsLabels: [],
      iexResults: [],
      stockList: props.tickers
    }
    /*this.socket = io(process.env.DOMAIN_NAME)
    this.socket.on('receive_stock', data => {
      this.setState({
        stockList: [...this.state.stockList, data.ticker]
      })
    })*/
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ stockList: nextProps.tickers });
    this.getStockDataMap(nextProps.tickers);
    console.log('nextProps: ', nextProps.tickers, 'state: ', this.state.stockList );
  }

  componentDidMount() {
     this.getStockDataMap();
  }

  async getStockDataMap(tickers) {
    const stocks = tickers || this.state.stockList;

    let iexStockDataResults = await Promise.all(stocks.map(async (ticker) => {

      let iexStockData;
      try {
        iexStockData = await this.getIEXData(ticker);
      }
      catch (error) {
        console.log(error);
      }
      finally {
        return iexStockData;
      }

    }))

    let finalLabels = iexStockDataResults[0].map((day, index) => {
      return day.label
    })

    let finalResult = iexStockDataResults.map((result, index) => {
      let obj = {
        label: stocks[index],
        data: result,
        borderColor: `#${Math.floor(Math.random()*16777215).toString(16)}`,
        borderWidth: 2,
        pointRadius: 0,
        fill: false
      };
      return obj;
    })

    this.setState({ iexResults: finalResult, iexResultsLabels: finalLabels });
    
  }
  
  // Reusable function to get a stock's data
  getIEXData(ticker) {
    return axios.get(`https://api.iextrading.com/1.0/stock/${ticker}/chart/1y`)
    .then((response) => {
      console.log(response);
      return response.data.map((day, index) => {
        return ({x: day.label, y: day.close});
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {

    const chartData = {
      labels: this.state.iexResultsLabels,
      datasets: this.state.iexResults
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
            },
            scales: {
              xAxes: [{
                display: false
              }]
            }
          }}
        />

      </div>
    )
  }
}

export default Chart;
