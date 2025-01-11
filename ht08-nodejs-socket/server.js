const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const routes = require('./routes');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    }
});

io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on('message', (data) => {
        console.log(`Message from ${socket.id}: ${data}`);
        socket.emit('response', `Эхо: ${data}`);
    });

    socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(`client ${socket.id} have joined to ${room}`);
        io.to(room).emit('roomMessage', `User ${socket.id} come to ${room}`);
    });

    socket.on('disconnect', () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
});

const chatNamespace = io.of('/chat');
chatNamespace.on('connection', (socket) => {
    console.log(`User joined to chat /chat: ${socket.id}`);

    socket.on('chatMessage', (message) => {
        console.log(`Messages on chat: ${message}`);
        chatNamespace.emit('chatBroadcast', `New message: ${message}`);
    });
});

server.listen(3000, () => {
    console.log('Server works on http://localhost:3000');
});
// app.use(app.router);
// app.get('/searchNeighborhoods', routes.search);
// app.get('/currentNeighborhood', routes.currentNeighborhood);
