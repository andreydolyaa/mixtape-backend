


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
            if(!message.msg.name){
                message.msg.name = 'Anonymous';
            }
            msgs.push(message)
            io.to(socket.myRoom).emit('chat message', message.msg);
            console.log('maessagse msg : ',message.msg);
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


        // socket.on('send-song-to-all', song => {
        //     io.to(socket.myRoom).emit('play-song',song)
        // })
        socket.on('send-song-to-all', song => {
            io.to(socket.myRoom).emit('play-song',song)
        })
        socket.on('play-preview-curr-song', song => {
            io.to(socket.myRoom).emit('play-song-old' ,song)
        })

        socket.on('move-to-new-time',currTimePlaying=>{
            io.to(socket.myRoom).emit('song-time-new',currTimePlaying);
        })
        socket.on('song-time-new-semi',currTimePlaying=>{
            io.to(socket.myRoom).emit('song-time-final',currTimePlaying);
        })

        socket.on('mix-updated',mix=>{
            io.to(socket.myRoom).emit('mix-is-updated',mix);
        })

        socket.on('sync-songs',time => {
            io.to(socket.myRoom).emit('sync-songs-time',time);
        })

        socket.on('newTime',time => {
            io.to(socket.myRoom).emit('setNewTime',time);
        })


        socket.on('join room', room => {
            // console.log('JOINED TO ROOM ',room);
            // socket.username = 'user';
            // io.to(room).emit('user joined',{name:'System message',txt:'New user has joind the chat'});
            socket.join(room);
            socket.myRoom = room;
        })
    })
}