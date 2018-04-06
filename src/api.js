/*import io from 'socket.io-client';
const socket = io(process.env.DOMAINNAME);

function subscribeToStockQuery(cb) {
  socket.on('stock', newStockList => cb(null, newStockList));
  socket.emit('subscribeToStockQuery');
  socket.on('greeting', function (data) {
    console.log(data);
  })
}

function subscribeToChat() {
  socket.emit('chat message', newMessage)
  newMessage
  return false;
}

export { subscribeToStockQuery }

/*const socket = io(process.env.WEBSITE);
function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 5000);
}
export { subscribeToTimer };*/

