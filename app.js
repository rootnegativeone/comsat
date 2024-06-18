// Initialize WebRTC (placeholder for actual WebRTC setup)
const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };
const peerConnection = new RTCPeerConnection(configuration);
const dataChannel = peerConnection.createDataChannel('messageChannel');

dataChannel.onmessage = (event) => {
  displayMessage(event.data);
};

function sendMessage() {
  const username = document.getElementById('username').value;
  const message = document.getElementById('messageInput').value;
  const fullMessage = `${username}: ${message}`;

  // Send message over data channel
  dataChannel.send(fullMessage);

  // Display the sent message
  displayMessage(fullMessage);

  // Clear the input field
  document.getElementById('messageInput').value = '';
}

function displayMessage(message) {
  const messageContainer = document.getElementById('messages');
  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  messageElement.className = 'alert alert-secondary mt-2'; // Bootstrap alert style for messages
  messageContainer.appendChild(messageElement);
}

