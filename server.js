require('dotenv').config();
const net = require('net');

const PORT_S15 = process.env.PORT_S15 || 5001;
const PORT_V5 = process.env.PORT_V5 || 5002;

// Utility to log and send ACK
const handleData = (protocol, socket, data) => {
  const message = data.toString();
  console.log(`[${protocol}] Received:`, message);

  let ack = '';
  if (protocol === 'S15') {
    // S15 ACK logic
    ack = 'LOAD';
  } else if (protocol === 'V5') {
    // V5 ACK logic (Example)
    ack = 'ACK';
  }

  if (ack) {
    socket.write(ack);
    console.log(`[${protocol}] Sent ACK: ${ack}`);
  }
};

// S15 Server
const serverS15 = net.createServer((socket) => {
  console.log('[S15] Device connected');
  socket.on('data', (data) => handleData('S15', socket, data));
  socket.on('end', () => console.log('[S15] Device disconnected'));
});
serverS15.listen(PORT_S15, () => console.log(`[S15] Listening on port ${PORT_S15}`));

// V5 Server
const serverV5 = net.createServer((socket) => {
  console.log('[V5] Device connected');
  socket.on('data', (data) => handleData('V5', socket, data));
  socket.on('end', () => console.log('[V5] Device disconnected'));
});
serverV5.listen(PORT_V5, () => console.log(`[V5] Listening on port ${PORT_V5}`));
