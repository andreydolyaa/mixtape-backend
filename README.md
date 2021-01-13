
## About this project
This app contains music "rooms" of many music genres.  
Whenever a user enters a "room" the playlist starts to play, and from that point the song and the time is broadcasted to every user which enters the same "room".  
Playing next/previous songs is available and it will also broadcast to all the users in the same channel.  
Every user has its own global player controller in which he controlls the songs pause/play/volume just for himself.  
Each "room" also has a chat panel where users in the same "room" can talk to each other.  
Its possible to search for new songs and add them to the room's playlist, all the users will see the addition.  
Song drag and drop is available, to change songs play positions.  
## Tools used in this app
This app uses ```Socket.io``` for synchronisation between songs/play/pause/next/prev/adding/delete/drag&drop/chat in each channel
```javascript
Vue.js, Vuex, Node.js, Express.js, mongoDB & Atlas, Sass, CSS3, HTML5, YoutubeAPI
```
