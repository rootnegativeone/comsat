const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
let peerConnection;
let dataChannel;

function createPeerConnection() {
  peerConnection = new RTCPeerConnection(configuration);
  dataChannel = peerConnection.createDataChannel('messagingChannel');
  dataChannel.onmessage = e => {
    document.getElementById('messages').innerHTML += `<p>Received: ${e.data}</p>`;
  };

  peerConnection.onicecandidate = event => {
    if (event.candidate) {
      // Handle ICE candidate, potentially share via a mesh network
    }
  };

  peerConnection.createOffer().then(offer => {
    return peerConnection.setLocalDescription(offer);
  }).then(() => {
    // Share offer via decentralized method
  });
}

function handleOffer(offer) {
  peerConnection = new RTCPeerConnection(configuration);
  peerConnection.ondatachannel = event => {
    dataChannel = event.channel;
    dataChannel.onmessage = e => {
      document.getElementById('messages').innerHTML += `<p>Received: ${e.data}</p>`;
    };
  };

  peerConnection.onicecandidate = event => {
    if (event.candidate) {
      // Handle ICE candidate, potentially share via a mesh network
    }
  };

  peerConnection.setRemoteDescription(new RTCSessionDescription(offer)).then(() => {
    return peerConnection.createAnswer();
  }).then(answer => {
    return peerConnection.setLocalDescription(answer);
  }).then(() => {
    // Share answer via decentralized method
  });
}

function sendMessage() {
  const message = document.getElementById('messageInput').value;
  dataChannel.send(message);
  document.getElementById('messages').innerHTML += `<p>Sent: ${message}</p>`;
}

createPeerConnection();

