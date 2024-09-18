# P2P Chat and File Sharing app
#### Video Demo:  https://www.loom.com/share/8d20fa4230f842228e0f9c79fbf593f8?sid=c419b909-4e63-4ac7-9d10-32714eaad768

## Overview
This project implements a peer-to-peer (P2P) chatting and file sharing application without relying on a central server, as is common in traditional WebSocket apps.I built this project using Angular for the client and an Express server as a central system only to establish the initial connection and keep track of clients' online/offline status. Once the connection is established, there is no intermediary between the two communicating clients, unlike in WebSocket chat applications where a constant server-client connection is maintained. This idea can be extrapolated to build large file-sharing apps, like uTorrent, using decentralized network functionality

## Features

P2P text messaging
P2P file sharing
Decentralized architecture
User discovery through PeerServer

## How It Works

PeerServer is used for initial connection to keep track of user IDs on the network.
The list of connected users is made public to everyone on the network.
Users can connect directly to each other using these IDs to send texts and files.

## Prerequisites

Node.js
PeerJS library

## Installation

Clone the repository:
Copygit clone https://github.com/yadav-ashutosh/p2pchat.git
cd p2p-chat-fileshare

Install dependencies for both the server and the client:
Copy# For the server
cd server
npm install

## Usage

Start the PeerServer:
cd peerserver
npm install
node server.js

Run the P2P chat application:
cd p2pchat
npm install
ng serve

Open your browser and navigate to http://localhost:4200 (or the port specified by Angular).

## Limitations

Currently, this application only works on a Local Area Network (LAN).
To enable communication across the internet, you'll need to implement a STUN/TURN server to bypass router NAT restrictions.

## Future Improvements

Implement STUN/TURN server support for internet-wide communication
Enhance security features
Improve user interface and user experience

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
