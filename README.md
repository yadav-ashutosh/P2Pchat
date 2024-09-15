P2P Chat and File Sharing App
This is a peer-to-peer (P2P) chatting and file-sharing application that eliminates the need for a central server, unlike traditional WebSocket-based apps. It enables direct communication between users after the initial connection phase, where a peer server is temporarily used to keep track of user IDs on the network.

Features
P2P Chat: Chat directly with users on the network without a central server.
File Sharing: Share files with other users on the network.
Peer Server: A simple server keeps track of active users and makes their IDs available to others for initiating direct P2P communication.
LAN Support: The app currently works over LAN only. For external network support, a STUN/TURN server is required to bypass router NAT walls.
Prerequisites
Before running the app, ensure that you have the following installed on your system:

Node.js
PeerJS Library
Installation and Running the App
Peer Server Setup
The peer server helps track the initial connection between peers.

Navigate to the peerserver directory.
Run the following commands:
bash
Copy code
npm install
node server.js
P2P Chat Application
The chat and file-sharing application runs separately.

Navigate to the p2pchat directory.
Run the following commands:
bash
Copy code
npm install
ng serve
Access the App
Open your browser and go to http://localhost:4200 to start using the app.

Limitations
Currently, this app works only on LAN. To extend its functionality to external networks, you will need to configure a STUN/TURN server to bypass the NAT firewall.
Future Improvements
Adding STUN/TURN server support for external network communication.
Improving the user interface for better usability.
