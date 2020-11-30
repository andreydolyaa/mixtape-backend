
// module.exports = connectSockets

// function connectSockets(io) {
//     io.on('connection', socket => {
//         socket.on('chat newMsg', msg=>{
//             console.log(msg)
//             // io.emit('chat addMsg', msg)
//             // emits only to sockets in the same room
//             io.to(socket.myTopic).emit('chat addMsg', msg)
//         })
//         socket.on('chat topic', topic=>{
//             if (socket.myTopic) {
//                 socket.leave(socket.myTopic)
//             }
//             socket.join(topic)
//             socket.myTopic = topic;
//         })
//     })
// }

module.exports = connectSockets
var msgs = []
function connectSockets(io) {
    io.on('connection', socket => {
        socket.emit('message history', msgs);
        socket.on('is typing', isTyping => {
                io.to(socket.myRoom).emit('type msg',isTyping);
        })
        socket.on('is not typing', isTyping => {
                io.to(socket.myRoom).emit('stop type msg',isTyping);
        })
        socket.on('send message', message => {
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