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
      tickerList: [],
      tickerData: [],
      chartData: []
    }
  }

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
      return (
        <Stock stock={stock} key={index} />
      );
    })
  }

  componentDidMount() {
    axios.get(`https://api.iextrading.com/1.0/stock/${this.props.ticker}/chart/1y`)
    .then((response) => {
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

  render() {

    let chartData = {
      labels: [],
      datasets: [{
        label: 'AAPL',
        data: this.state.chartData,
        borderColor: ["red"],
        borderWidth: 2,
        fill: false
      },{
        label: 'GOOGL',
        data: ['150','151','153','155','149'],
        borderColor: ["blue"],
        borderWidth: 2,
        fill: false
      }]
    };

    



    //var convertChartData = this.state.chartdata.map((chart, index) => {
      //var chartData = chart.options.map((chart, index) => {
      //  convertedChartData.labels.push('1');
      //  convertedChartData.datasets[0].data.push('1');
      //})
    //})

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
