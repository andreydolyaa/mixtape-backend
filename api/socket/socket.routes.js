


module.exports = connectSockets
var msgs = []
function connectSockets(io) {
    io.on('connection', socket => {
        console.log('SOCKET CONNECTED');
        socket.emit('message history', msgs);
        socket.on('is typing', isTyping => {
                io.to(socket.myRoom).emit('type msg',isTyping);
        })
        socket.on('is not typing', isTyping => {
                io.to(socket.myRoom).emit('stop type msg',isTyping);
        })
        socket.on('send message', message => {
            console.log('MSG SENT');
            msgs.push(message)
            console.log(msgs);
            io.to(socket.myRoom).emit('chat message', message.msg);
        })
        socket.on('join room', room => {
            socket.join(room);
            socket.myRoom = room;
        })
    })
}