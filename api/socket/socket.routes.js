


module.exports = connectSockets
var msgs = []
function connectSockets(io) {
    io.on('connection', socket => {
        console.log('CONNECTED ID: ',socket.id);
        // console.log('SOCKET LOG IN',socket);
        var totalConnected = io.engine.clientsCount;
        socket.emit('getCount',totalConnected);
        socket.emit('message history', msgs);
        socket.on('is typing', isTyping => {
                io.to(socket.myRoom).emit('type msg',isTyping);
        })
        socket.on('is not typing', isTyping => {
                io.to(socket.myRoom).emit('stop type msg',isTyping);
        })
        socket.on('send message', message => {
            console.log('MESSAGE :',message);
            // if(message.msg.name === ''){
            //     message.msg.name = 'Guest';
            // }
            msgs.unshift(message)
            io.to(socket.myRoom).emit('chat message', message.msg);
            console.log('maessagse msg : ',message.msg);
        })
        socket.on('set-song-playing', song => {
            console.log('set-song-playing',song )
            io.to(socket.myRoom).emit('play-song',song);
        })

        socket.on('clear chat',()=>{
            io.to(socket.myRoom).emit('clear-all-chat');
            msgs=[];
        })

        socket.on('send gif',gif =>{
            io.to(socket.myRoom).emit('gif',gif);
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
            console.log('play-song',song)
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
            console.log('mix-updated')
            io.to(socket.myRoom).emit('mix-is-updated',mix);
        })

        socket.on('sync-songs',time => {
            io.to(socket.myRoom).emit('sync-songs-time',time);
        })

        socket.on('newTime',time => {
            io.to(socket.myRoom).emit('setNewTime',time);
        })


        socket.on('setOn', time => {
            io.to(socket.myRoom).emit('setOnTwo',time);
        })

        socket.on('disconnect', room => {
            socket.leave(room)
            console.log('DISCONNECTED ID: ',socket.id);
        });


        socket.on('return-time',time => {
            io.to(socket.myRoom).emit('returnNewTime',time);
        })


        socket.on('join room', room => {
            console.log('SOCKY MY ROOM:',socket.myRoom);
            // console.log('JOINED TO ROOM ',room);
            // socket.username = 'user';
            // io.to(room).emit('user joined',{name:'System message',txt:'New user has joind the chat'});
            if(socket.myRoom){
                console.log('LEAVED ROOM ',socket.myRoom);
                socket.leave(socket.myRoom)
            }
            socket.join(room);
            console.log('JOINED ROOM ',room );
            socket.myRoom = room;
            // console.log('SOCKY MY ROOM:',socket.myRoom);
        })
    })
}