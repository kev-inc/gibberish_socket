const express = require('express')
const socketio = require('socket.io')
const http = require('http')
const path = require('path')
const { createRoom, userJoinRoom, getRoomData, incrementAllRooms, userLeave } = require('./utils/rooms')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', socket => {
  socket.on('joinRoom', ({username, roomId}) => {
    const user = userJoinRoom(socket.id, username, roomId)
    socket.join(roomId)
    socket.emit('console', user)
    socket.broadcast.to(roomId).emit('message', 'Someone joined')
    io.to(roomId).emit('room', getRoomData(roomId))
  })

  socket.on('disconnect', () => {
    const rooms = userLeave(socket.id)
    for(const room in rooms) {
      io.to(room.id).emit('room', getRoomData(room.id))
    }
  })



  // socket.on('joinRoom', ({username, room}) => {
  //   const user = 
  // })
  socket.emit('message', 'Welcome to Guess the Gibberish')
})

setInterval(() => {
  const rooms = incrementAllRooms()
  console.log(rooms)
  for (const room of rooms) {
    io.to(room.id).emit('room', getRoomData(room.id))
  }
}, 1000)




const PORT = process.env.PORT || 3000
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))