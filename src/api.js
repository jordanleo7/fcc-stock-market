import ioclient from 'socket.io-client';

const socket = ioclient('http://localhost:4000');

function testing() {
  socket.on('connect', 'hello there');
}

export { testing }

 
/*const socket = io(process.env.WEBSITE);
function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 5000);
}
export { subscribeToTimer };*/

