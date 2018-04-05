import io from 'socket.io-client';

const socket = io(process.env.DOMAINNAME);




/*const socket = io(process.env.WEBSITE);
function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 5000);
}
export { subscribeToTimer };*/

