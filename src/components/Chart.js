import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

class Chart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      iexResults: []
    }
  }

  componentDidMount() {
     this.getStockDataMap();
  }

  async getStockDataMap() {
    let dummyStocks = ["AAPL","MSFT","GOOGL"];
    let finalResult = [];

    let iexStockDataResults = await Promise.all(dummyStocks.map(async (ticker) => {

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

    finalResult = iexStockDataResults.map((result, index) => {
      let obj = {
        label: dummyStocks[index],
        data: result,
        borderColor: `#${Math.floor(Math.random()*16777215).toString(16)}`,
        borderWidth: 1,
        fill: false
      };
      return obj;
    })

    this.setState({ iexResults: finalResult });
    
  }
  
  // Reusable function to get a stock's data OK
  getIEXData(ticker) {
    return axios.get(`https://api.iextrading.com/1.0/stock/${ticker}/chart/1y`)
    .then((response) => {
      console.log(response);
      return response.data.map((x, index) => {
        return x.close;
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }

  render() {

    let chartData = {
      labels: [],
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
            }
          }}
          options={{
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }}
          }
        />

      </div>
    )
  }
}

export default Chart;
