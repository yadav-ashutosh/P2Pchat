import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Peer } from "peerjs";

// declare const Peer: any; // Declare PeerJS if it's included as an external library

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  peerId: string = '';
  message: string = '';
  transactionData: string = `{
    "peerID": "your_id",
    "txn_amount": "50.91",
    "receiver_id": "receiver_peerID"
  }`;
  logs: string[] = [];
  selectedPeerId: string = '';
  availablePeers: string[] = [];
  peerConnection: any;
  connectedPeer = "";
  fileToSend: File | null = null;
  title = 'p2pchat';
  peer: any;
  apiUrl = 'http://localhost:9001/api/availablePeers';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.initializePeer();
  }
  connectToPeer(peer : string) {
    this.connectedPeer = peer;
    this.selectedPeerId = peer;
    if (peer) {
      this.peerConnection = this.peer.connect(peer);
      this.logs.push(`Connecting to peer: ${peer}`);

      this.peerConnection.on('open', () => {
        this.logs.push(`Connection opened with peer: ${peer}`);
      });

      this.peerConnection.on('data', (data: any) => {
        this.logs.push(`Data received: ${data}`);
      });
    } else {
      this.logs.push('Please enter a valid Peer ID');
    }
  }

  onFileSelected(event: any) {
    this.fileToSend = event.target.files[0];
  }

  sendMessage() {
    if (this.peerConnection) {
      if (this.fileToSend) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          const arrayBuffer = event.target.result;
          this.peerConnection.send({ fileName: this.fileToSend?.name, fileData: arrayBuffer });
          this.logs.push(`Sent file: ${this.fileToSend?.name}`);
        };
        reader.readAsArrayBuffer(this.fileToSend);
      } else if (this.message.trim() !== '') {
        this.peerConnection.send(this.message);
        this.logs.push(`You: ${this.message}`);
        this.message = ''; // Clear input
      }
    } else {
      this.logs.push('No peer connection available');
    }
  }

  sendMessageForValidation() {
    if (this.selectedPeerId) {
      // Send transaction data to selected peer
      this.logs.push(`Sending transaction data to peer: ${this.selectedPeerId}`);
      this.peerConnection.send(this.transactionData);
    } else {
      this.logs.push('No peer selected');
    }
  }
  initializePeer() {
    this.peer = new Peer({ host: 'localhost', port: 9000, path: '/', key: 'peerjs' });

    this.peer.on('open', (id: string) => {
      console.log(`Connected to PeerJS server with ID: ${id}`);
      this.peerId = id;
      this.fetchDataFromServer();
      setInterval(() => {
        this.fetchDataFromServer();
      }, 60000);
    });

    this.peer.on('connection', (peerConnection: any) => {
      peerConnection.on('open', () => {
        console.log('Peer connection opened');
      });
      peerConnection.on('data', (data: any) => {
        this.processReceivedData(data);
      });
    });
  }


  processReceivedData(data: any) {
    if (data.fileData) {
      const blob = new Blob([data.fileData]);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = data.fileName;
      link.click();
      this.displayMessage('Received file: ' + data.fileName);
    } else {
      this.displayMessage('Peer: ' + data);
    }
  }



  displayMessage(message: string) {
    this.logs.push(message);
  }

  fetchDataFromServer() {
    this.http.get<any>(this.apiUrl).subscribe({
      next: (data) => {
        console.log('Data from server:', data);
        // this.availablePeers = data.availablePeers || [];
        this.availablePeers=[];
        console.log(data.availablePeers);
        for(var p of data.availablePeers){
          if(p!=this.peerId) this.availablePeers.push(p);
        }
      },
      error: (error) => {
        console.error('Error fetching data:', error.message);
      },
    });
  }
}
