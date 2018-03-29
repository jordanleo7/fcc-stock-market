import openSocket from 'socket.io-client';
const socket = openSocket(process.env.WEBSOCKET);
function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 5000);
}
export { subscribeToTimer };