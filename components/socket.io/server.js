const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', (socket) => {
    console.log('Novo cliente conectado:', socket.id);

    socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
    });

    // Adicione lógica para lidar com mensagens do cliente para a loja
    socket.on('clienteParaLoja', (mensagem) => {
        // Envie a mensagem para a loja com socket.broadcast.emit
        socket.broadcast.emit('mensagemLoja', mensagem);
    });

    // Adicione lógica para lidar com mensagens da loja para o cliente
    socket.on('lojaParaCliente', (mensagem) => {
        // Envie a mensagem para o cliente com socket.broadcast.emit
        socket.broadcast.emit('mensagemCliente', mensagem);
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Servidor está ouvindo na porta ${PORT}`);
});