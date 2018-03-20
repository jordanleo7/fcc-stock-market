const graphql = require('graphql');
const Stock = require('./Stock');

const { 
  GraphQLObjectType, 
  GraphQLString
} = graphql;

const StockType = new GraphQLObjectType({
  name: 'Stock',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString }
  })
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});