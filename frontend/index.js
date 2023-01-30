const messageInput = document.getElementById('messageInput');
const form = document.getElementById('form');
const messagesContainer = document.getElementById('messages');
const socket = io('http://localhost:3000');


form.addEventListener('submit', (event) => {
  event.preventDefault();

  fetch('http://localhost:3000/message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message: messageInput.value }),
  });

  messageInput.value = '';
});

fetch('http://localhost:3000/messages')
  .then((response) => response.json())
  .then((messages) => {
    messages.forEach((message) => {
      const messageElement = document.createElement('div');
      messageElement.innerText = message;
      messagesContainer.appendChild(messageElement);
    });
  });
 
  socket.on('message', (message) => {
    console.log('new message: ', message);
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messagesContainer.appendChild(messageElement);
  });