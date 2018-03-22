const express = require('express')
require('dotenv').config();
const session = require('express-session')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());

mongoose.connect(process.env.MONGO_URI);
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true
}));

// Priority serve any static files.
app.use(express.static("build"));

// All remaining requests return the React app, so it can handle routing
app.route('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

// Server listen
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Express is listening on port ${PORT}`))