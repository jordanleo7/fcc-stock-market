import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

class Chart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      iexResultsLabels: [],
      iexResults: [],
      stockList: this.props.tickers
    }
  }

  componentDidMount() {
    this.getStockDataMap(this.props.tickers)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ stockList: nextProps.tickers });
    this.getStockDataMap(nextProps.tickers);
  }

  async getStockDataMap(tickers) {

    let iexStockDataResults = await Promise.all(tickers.map(async (ticker) => {

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

    if (this.state.stockList.length > 0) {

      let finalLabels = iexStockDataResults[0].map((day, index) => {
        return day.x
      })
      let browserColorFix = ['red', 'blue', 'orange', 'green', 'purple', 'brown', 'black', 'gray']
  
      let finalResult = iexStockDataResults.map((result, index) => {
        //Random colors only worked in Safari, not Chrome nor Firefox(?) Tried adding #
        //let tempColor = Math.floor(Math.random()*16777215).toString(16);
        let obj = {
          label: tickers[index],
          data: result,
          backgroundColor: browserColorFix[index], //tempColor,
          borderColor: browserColorFix[index], //tempColor,
          borderWidth: 2,
          pointRadius: 0,
          fill: false
        };
        return obj;
      })
  
      this.setState({ iexResults: finalResult, iexResultsLabels: finalLabels });
  
    }

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

    const chartData = () => ({
      labels: this.state.iexResultsLabels,
      datasets: this.state.iexResults
    });

    return (
      <div className="chart">
        <Line
          data={{labels: this.state.iexResultsLabels, datasets: this.state.iexResults}}
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
                display: true
              }]
            }
          }}
        />
      </div>
    )
  }
}

export default Chart;
