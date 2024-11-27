const WebSocket = require('ws');

// Tạo WebSocket server trên cổng 3000
const wss = new WebSocket.Server({ port: 3000 });

wss.on('connection', (ws) => {
    console.log('A user connected');

    // Gửi thông điệp chào mừng
    ws.send('Welcome to the WebSocket server!');

    // Lắng nghe các tin nhắn từ client
    ws.on('message', (message) => {
        console.log('received: %s', message);
    });

    // Xử lý khi client ngắt kết nối
    ws.on('close', () => {
        console.log('A user disconnected');
    });
});

console.log('WebSocket server started on ws://localhost:3000');
