const fetch = require('node-fetch')

fetch(
  'link'
)
.then(response => response.text())

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: '...',

    fields: () => ({
      author: {
        type: AuthorType,
        args: {
          id: { type: GraphQLInt }
        }
      }
    })
  })
})