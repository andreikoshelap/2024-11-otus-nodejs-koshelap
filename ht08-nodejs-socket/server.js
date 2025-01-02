const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*', // Укажите домен вашего клиента
        methods: ['GET', 'POST'], // Допустимые методы
    }
});

// Основное пространство имен (Namespace)
io.on('connection', (socket) => {
    console.log(`Клиент подключен: ${socket.id}`);

    // Обработка входящих сообщений
    socket.on('message', (data) => {
        console.log(`Сообщение от ${socket.id}: ${data}`);
        socket.emit('response', `Эхо: ${data}`);
    });

    // Работа с комнатами (Rooms)
    socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(`Клиент ${socket.id} присоединился к комнате ${room}`);
        io.to(room).emit('roomMessage', `Пользователь ${socket.id} вошел в комнату ${room}`);
    });

    // Уведомление о выходе
    socket.on('disconnect', () => {
        console.log(`Клиент отключен: ${socket.id}`);
    });
});

// Пространство имен "чат"
const chatNamespace = io.of('/chat');
chatNamespace.on('connection', (socket) => {
    console.log(`Пользователь подключился к /chat: ${socket.id}`);

    socket.on('chatMessage', (message) => {
        console.log(`Сообщение в чате: ${message}`);
        chatNamespace.emit('chatBroadcast', `Новое сообщение: ${message}`);
    });
});

// Запуск сервера
server.listen(3000, () => {
    console.log('Сервер работает на http://localhost:3000');
});
