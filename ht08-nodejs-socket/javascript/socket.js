var socket = io('http://localhost:3000');

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

socket.on('disconnect', () => {
    displayMessage('Disconnected');
});

export function sendMessage(latlng) {
    const input = document.getElementById('messageInput');
    // const input = document.getElementsByClassName("marker-position");
    console.log(`test ${input.value}`);
    const message = input.value;
    if (message) {
        socket.emit('message', message);
        displayMessage(`You: ${message}`);
        input.value = '';
    }
}


