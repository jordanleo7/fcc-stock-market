const express = require('express')
const session = require('express-session')
const graphqlHTTP = require('express-graphql')
const { buildSchema, GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql')

const app = express()

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}));

const schema = require('./schema')

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

new GraphQLObjectType({
  name: 'MyType',
  fields: {
    myField: {
      type: GraphQLString,
      resolve(parentValue, args, request) {
        // use `request.session` here
      }
    }
  }
});

// Priority serve any static files.
app.use(express.static("build"));

// All remaining requests return the React app, so it can handle routing
app.route('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

// Server listen
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Express is listening on port ${PORT}`))