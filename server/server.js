const express = require('express');
const session = require('express-session');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const urlEncodedParser = bodyParser.urlencoded({ extended: false });

const app = express();

// web socket.io
// const http = require('http').Server(app);
const socket = require('socket.io-client')(process.env.WEBSITE);
socket.on('connect', function(){
  console.log('a client has connected to the websocket')
});
socket.on('event', function(data){});
socket.on('disconnect', function(){});

/*
io.on('connection', (client) => {
  console.log('A user connected to websocket');
  client.on('subscribeToTimer', (interval) => {
    console.log('client is subscribed to timer with interval ', interval);
    setInterval(() => {
      client.emit('timer', new Date());
    }, interval);
  });
});
*/
// io.listen(process.env.WEBSOCKET);

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'true'}));

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
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Express is listening on port ${PORT}`))