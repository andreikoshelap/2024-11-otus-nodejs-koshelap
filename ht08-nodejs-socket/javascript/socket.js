    const socket = io('http://localhost:3000');

    const messagesDiv = document.getElementById('messages');

    function displayMessage(message) {
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    messagesDiv.appendChild(messageElement);
}

    socket.on('connect', () => {
    displayMessage('Connected');
});

    socket.on('response', (data) => {
    displayMessage(`Server: ${data}`);
});

    socket.on('roomMessage', (data) => {
    displayMessage(`Message from room: ${data}`);
});

    socket.on('disconnect', () => {
    displayMessage('Disconnected');
});

    function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value;
    if (message) {
    socket.emit('message', message);
    displayMessage(`You: ${message}`);
    input.value = '';
}
}

    function joinRoom() {
    const roomInput = document.getElementById('roomInput');
    const room = roomInput.value;
    if (room) {
    socket.emit('joinRoom', room);
    displayMessage(`You have joined to room: ${room}`);
    roomInput.value = '';
}
}

    const chatSocket = io('http://localhost:3000/chat');

    chatSocket.on('chatBroadcast', (message) => {
    displayMessage(`[Чат]: ${message}`);
});

    function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value;
    if (message) {
    chatSocket.emit('chatMessage', message);
    input.value = '';
}
}
