const socket = io()

const roomText = document.getElementById('room_id')
const nicknameText = document.getElementById('nickname')
const stateText = document.getElementById('game_state')
const userListText = document.getElementById('userList')
const timerText = document.getElementById('timer')

const { username, roomId } = Qs.parse(location.search, {
  ignoreQueryPrefix: true
})

socket.emit('joinRoom', {username, roomId})

socket.on('console', msg => {
  console.log(msg)
  roomText.innerText = msg.room
  nicknameText.innerText = msg.username
})

socket.on('message', message => {
  console.log(message)
})

socket.on('room', room => {
  console.log(room)
  timerText.innerText = room.timer
  stateText.innerText = room.state
  userListText.innerText = `
  ${room.users.map(user => user.username).join(', ')}
  `
})