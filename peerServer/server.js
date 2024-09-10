// server.js
const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http').Server(app);
const PeerServer = require('peer').PeerServer;
const serverConfig = require('./peerjs-server-config.json');

const peerServer = PeerServer(serverConfig, () => {
  console.log(`PeerJS server is running on port ${serverConfig.port}`);
});
app.use(cors())
app.get('/api/availablePeers', (req, res) => {
  const availablePeers = Object.keys(connectedPeers);
  res.json({ availablePeers });
});
http.listen(9001, () => {
  console.log('Express server listening on port 9001');
});
const connectedPeers = {};

peerServer.on('connection', (client) => {
  console.log(`New client connected: ${client.id}`);
  connectedPeers[client.id] = true;
  const availablePeers = Object.keys(connectedPeers);
  client.send(JSON.stringify({ type: 'availablePeers', data: availablePeers }));
  console.log('Available Peers:', availablePeers);
});

peerServer.on('disconnect', (client) => {
  console.log(`Client disconnected: ${client.id}`);
  delete connectedPeers[client.id];
});
// file:///C:/Users/Ashu/Projects/Arquanum%20projects/sample-cs/peer_test/index.html