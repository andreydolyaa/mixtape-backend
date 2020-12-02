


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
            io.to(socket.myRoom).emit('chat message', message.msg);
        })
        socket.on('set-song-playing', song => {
            io.to(socket.myRoom).emit('play-song',song);
        })


        socket.on('first-song-play', () => {
            io.to(socket.myRoom).emit('start-first-song');
        })

        socket.on('move-to',currTimePlaying => {
            io.to(socket.myRoom).emit('song-time',currTimePlaying);
        })

        socket.on('next-song',nextSong => {
            io.to(socket.myRoom).emit('play-song',nextSong);
        })

        socket.on('prev-song',nextSong => {
            io.to(socket.myRoom).emit('play-song',nextSong);
        })

        socket.on('pause-song-playing',currSong => {
            io.to(socket.myRoom).emit('pause-song',currSong);
        })


        socket.on('pause-global-player',()=>{
            io.to(socket.myRoom).emit('pause-song');
        })


        socket.on('play-global-player', () => {
            io.to(socket.myRoom).emit('play-song');
        })


        socket.on('send-song-to-all', song => {
            io.to(socket.myRoom).emit('play-song',song)
        })
        socket.on('play-preview-curr-song', song => {
            io.to(socket.myRoom).emit('play-song-old' ,song)
        })

        socket.on('join room', room => {
            socket.join(room);
            socket.myRoom = room;
        })
    })
}