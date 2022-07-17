const socketIO = require('socket.io');
const {startApp} = require('./app.js');

const SOCKET_PORT = 8081;

let socket = null;
const getSocket = () => socket;

startApp().then(server => {
    const io = socketIO(server);
    io.on('connection', (s) => {
        socket = s;
        console.log('Server side socket connection established at port ' + SOCKET_PORT);
        socket.emit('live', 'ESTABLISHED');
      });
      io.on("error", (err) => {
        console.log('SOCKET ERROR', err);
      });
      io.listen(SOCKET_PORT);
});

module.exports = { getSocket };

