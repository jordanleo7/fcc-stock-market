const express = require('express');
const session = require('express-session');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const bodyParser = require('body-parser');
const urlEncodedParser = bodyParser.urlencoded({ extended: false });

const app = require('express')();

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'true'}));

// mongoose
mongoose.connect(process.env.MONGO_URI);
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// graphql
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
const server = app.listen(PORT, () => console.log(`Express is listening on port ${PORT}`))

const io = require('socket.io').listen(server);

io.on('connection', (socket) => {

  console.log('Socket.io connected');

  socket.on('add_stock', (data) => {
    io.emit('receive_stock', data);
  });

  socket.on('delete_stock', (data) => {
    io.emit('receive_stock', data);
  });

  socket.on('send_message', function(data){
    io.emit('receive_message', data);
  });

});
