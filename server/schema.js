const graphql = require('graphql');
const Stock = require('./Stock');
const _ = require('lodash');
const { 
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema
} = graphql;
/*
const axios = require('axios');

function newStockTicker (tickerSymbol) {
  axios.get(`https://api.iextrading.com/1.0/stock/${tickerSymbol}`)
  .then(response => {
    if (response.companyName !== null) {

    }
  })
  .catch({

  })
}
*/

var stocks = [
  { ticker: 'AAPL', id: '1' },
  { ticker: 'MSFT', id: '2' },
  { ticker: 'GOOGL', id: '3' },
  { ticker: 'FB', id: '4' }
]

const StockType = new GraphQLObjectType({
  name: 'Stock',
  fields: () => ({
    id: { type: GraphQLString },
    ticker: { type: GraphQLString }
  })
});

const StockQuery = new GraphQLObjectType({
  name: 'StockQueryType',
  fields: {
    stock: {
      type: StockType,
      args: { ticker: { type: GraphQLString } },
      resolve(parent, args) {
        // code to get data from db/other source
        return _.find(stocks, { ticker: args.ticker} );
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: StockQuery
})