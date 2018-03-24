const graphql = require('graphql');
const Stock = require('./Stock');

const { 
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const StockType = new GraphQLObjectType({
  name: 'Stock',
  fields: () => ({
    id: { type: GraphQLID },
    ticker: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    stock: {
      type: StockType,
      args: { ticker: { type: GraphQLString } },
      resolve(parent, args) {
        // code to get data from db/other source
        return Stock.findOne({ ticker: args.ticker });
      }
    },
    stocks: {
      type: new GraphQLList(StockType),
      resolve(parent, args) {
        return Stock.find({});
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addStock: {
      type: StockType,
      args: { ticker: { type: GraphQLString } },
      resolve(parent, args) {
        let stock = new Stock({
          ticker: args.ticker
        });
        return stock.save();
      }
    },
    deleteStock: {
      type: StockType,
      args: { ticker: { type: GraphQLString } },
      resolve(parent, args) {
        return Stock.findOneAndRemove({ ticker: args.ticker });
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});