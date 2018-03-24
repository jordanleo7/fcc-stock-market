import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

class Chart extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tickerData: [],
      chartData: []
    }
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
        borderColor: [ "#2999C5", "#275E71", "#D5393E", "#FA8051", "#F2E846", "#D6589E",
"BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","DeepPink","Coral","CornflowerBlue","GoldenRod","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","Darkorange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","Cornsilk","MediumAquaMarine","Chocolate","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","Red","RosyBrown","RoyalBlue","Blue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen","AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond",
        ],
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

export default Chart;
