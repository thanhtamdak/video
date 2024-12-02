const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

let users = [];  // Mảng lưu danh sách người tham gia

// Khi có một kết nối WebSocket mới
wss.on('connection', (ws) => {
    console.log('Một người dùng đã kết nối');
    
    // Nhận thông tin từ client
    ws.on('message', (message) => {
        const data = JSON.parse(message);

        if (data.type === 'join') {
            // Thêm người tham gia vào danh sách
            users.push({ username: data.username });
            console.log(`${data.username} đã tham gia`);
            // Gửi danh sách người tham gia cho tất cả các client
            broadcastUsers();
        } 
        else if (data.type === 'leave') {
            // Xóa người tham gia khỏi danh sách
            users = users.filter(user => user.username !== data.username);
            console.log(`${data.username} đã rời đi`);
            // Cập nhật danh sách người tham gia cho tất cả client
            broadcastUsers();
        }
    });

    // Hàm phát sóng danh sách người tham gia cho tất cả các client
    function broadcastUsers() {
        const userList = { type: 'update_users', users: users };
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(userList));
            }
        });
    }

    // Khi kết nối WebSocket bị đóng
    ws.on('close', () => {
        console.log('Kết nối bị đóng');
    });
});

console.log('WebSocket server đang chạy trên port 8080');
