const graphql = require('graphql');
const Stock = require('./Stock');
const _ = require('lodash');

var stocks = [
  { ticker: 'AAPL', id: '1' },
  { ticker: 'MSFT', id: '2' },
  { ticker: 'GOOGL', id: '3' },
  { ticker: 'FB', id: '4' }
]

const { 
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema
} = graphql;

const StockType = new GraphQLObjectType({
  name: 'Stock',
  fields: () => ({
    id: { type: GraphQLString },
    ticker: { type: GraphQLString }
  })
});

const StocksQuery = new GraphQLObjectType({
  name: 'StocksQuery',
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

/*
stock(ticker: 'AAPL') {
  id
  ticker
}
*/

module.exports = new GraphQLSchema({
  query: StocksQuery
})